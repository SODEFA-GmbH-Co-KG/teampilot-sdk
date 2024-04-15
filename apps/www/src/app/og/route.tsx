import { ImageResponse } from "@vercel/og"
import { type NextRequest } from "next/server"
export const runtime = "edge"

const size = {
  width: 1200,
  height: 630,
}

export async function GET(req: NextRequest): Promise<ImageResponse> {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get("title")

  return new ImageResponse(
    (
      <div
        tw={`h-full w-full flex text-white max-w-[${size.width}px] max-h-[${size.height}px] relative overflow-hidden`}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/clearOgImage.png`}
          tw="absolute w-full h-full"
        />
        <div tw="flex p-[60px]">
          <div tw="flex max-w-full overflow-hidden justify-between items-start flex-col pt-32">
            <div tw="text-8xl flex">
              <div>{title}</div>
            </div>

            <div tw="flex pt-6">
              <div tw="text-2xl flex pr-1.5">Docs for</div>
              <div tw="text-2xl text-[#f55e00] flex"> teampilot.ai</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
