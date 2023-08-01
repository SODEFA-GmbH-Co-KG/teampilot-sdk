import { z } from "zod"

export type OpenAIFunctionParameters = {
  type: "object" | "array" | "string" | "undefined" | "number" | "null"
  description?: string
  enum?: string[]
  properties?: Record<string, OpenAIFunctionParameters>
  required?: string[]
  items?: OpenAIFunctionParameters
}

export type OpenAIFunctionDefinition = {
  name: string
  description: string
  parameters: OpenAIFunctionParameters
}

export function transformZodSchemaToOpenAi(
  schema: z.Schema<unknown>
): OpenAIFunctionParameters {
  if (schema instanceof z.ZodObject) {
    const properties: Record<string, OpenAIFunctionParameters> = {}
    const required: string[] = []

    for (const key in schema.shape) {
      const zodType: z.ZodTypeAny = schema.shape[key]

      if (!zodType.isOptional()) {
        required.push(key)
      }
      const subProperty = transformZodSchemaToOpenAi(zodType)
      if (subProperty) {
        properties[key] = subProperty
      }
    }

    return {
      type: "object",
      properties,
      required,
      description: schema.description,
    }
  } else if (schema instanceof z.ZodEnum) {
    return {
      type: "string",
      enum: schema._def.values,
      description: schema.description,
    }
  } else if (schema instanceof z.ZodString) {
    return {
      type: "string",
      description: schema.description,
    }
  } else if (schema instanceof z.ZodNumber) {
    return {
      type: "number",
      description: schema.description,
    }
  } else if (
    schema instanceof z.ZodDefault ||
    schema instanceof z.ZodOptional
  ) {
    const subProperty = transformZodSchemaToOpenAi(schema._def.innerType)
    return {
      ...subProperty,
    }
  }
  //extended with teampilot: https://teampilot.ai/team/sodefa/chat/cljwvoee1000jmf08aelqaum0
  else if (schema instanceof z.ZodArray) {
    const elementType = schema._def.type
    const subProperty = transformZodSchemaToOpenAi(elementType)
    return {
      type: "array",
      items: subProperty,
      description: schema.description,
    }
  } else {
    throw new Error(`Unsupported Zod type ${schema.constructor.name}`)
  }
}
