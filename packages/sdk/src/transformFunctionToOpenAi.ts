import { type z } from 'zod'

export type OpenAIFunctionParameters = {
  type: 'object' | 'array' | 'string' | 'undefined' | 'number' | 'null'
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

const getZodType = (schema: z.Schema<unknown>) => {
  return (schema._def as any).typeName as string
}

const isZodObject = (schema: z.Schema<unknown>): schema is z.ZodObject<any> => {
  return getZodType(schema) === 'ZodObject'
}
const isZodString = (schema: z.Schema<unknown>): schema is z.ZodString => {
  return getZodType(schema) === 'ZodString'
}
const isZodNumber = (schema: z.Schema<unknown>): schema is z.ZodNumber => {
  return getZodType(schema) === 'ZodNumber'
}
const isZodEnum = (schema: z.Schema<unknown>): schema is z.ZodEnum<any> => {
  return getZodType(schema) === 'ZodEnum'
}
const isZodArray = (schema: z.Schema<unknown>): schema is z.ZodArray<any> => {
  return getZodType(schema) === 'ZodArray'
}
const isZodOptional = (
  schema: z.Schema<unknown>
): schema is z.ZodOptional<any> => {
  return getZodType(schema) === 'ZodOptional'
}
const isZodDefault = (
  schema: z.Schema<unknown>
): schema is z.ZodDefault<any> => {
  return getZodType(schema) === 'ZodDefault'
}

export function transformZodSchemaToOpenAi(
  schema: z.Schema<unknown>
): OpenAIFunctionParameters {
  if (isZodObject(schema)) {
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
      type: 'object',
      properties,
      required,
      description: schema.description,
    }
  } else if (isZodEnum(schema)) {
    return {
      type: 'string',
      enum: schema._def.values,
      description: schema.description,
    }
  } else if (isZodString(schema)) {
    return {
      type: 'string',
      description: schema.description,
    }
  } else if (isZodNumber(schema)) {
    return {
      type: 'number',
      description: schema.description,
    }
  } else if (isZodDefault(schema) || isZodOptional(schema)) {
    const subProperty = transformZodSchemaToOpenAi(schema._def.innerType)
    return {
      ...subProperty,
    }
  }
  //extended with teampilot: https://teampilot.ai/team/sodefa/chat/cljwvoee1000jmf08aelqaum0
  else if (isZodArray(schema)) {
    const elementType = schema._def.type
    const subProperty = transformZodSchemaToOpenAi(elementType)
    return {
      type: 'array',
      items: subProperty,
      description: schema.description,
    }
  } else {
    throw new Error(`Unsupported Zod type ${schema.constructor.name}`)
  }
}
