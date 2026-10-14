import { z } from 'zod'
import { handle, parseCode, readJson } from '@/lib/server/http'
import { readSessionToken } from '@/lib/server/session'
import { changeQuantity, removeItem, updateItem } from '@/lib/server/store'
import { itemUpdateSchema, quantityChangeSchema } from '@/lib/validation'

type Ctx = RouteContext<'/api/rooms/[code]/items/[itemId]'>

const itemIdSchema = z.uuid('Invalid product id.')

export async function PUT(request: Request, ctx: Ctx) {
  return handle(async () => {
    const { code, itemId } = await ctx.params
    const input = itemUpdateSchema.parse(await readJson(request))
    return updateItem(parseCode(code), await readSessionToken(), itemIdSchema.parse(itemId), input)
  })
}

export async function PATCH(request: Request, ctx: Ctx) {
  return handle(async () => {
    const { code, itemId } = await ctx.params
    const { delta } = quantityChangeSchema.parse(await readJson(request))
    return changeQuantity(parseCode(code), await readSessionToken(), itemIdSchema.parse(itemId), delta)
  })
}

export async function DELETE(_request: Request, ctx: Ctx) {
  return handle(async () => {
    const { code, itemId } = await ctx.params
    return removeItem(parseCode(code), await readSessionToken(), itemIdSchema.parse(itemId))
  })
}
