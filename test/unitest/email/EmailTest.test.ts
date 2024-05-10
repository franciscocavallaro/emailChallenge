import { beforeEach } from "node:test"
import { MockContext, Context, createMockContext } from "../../../src/context"

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

