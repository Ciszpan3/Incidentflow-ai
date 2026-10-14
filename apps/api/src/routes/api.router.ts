import { Router } from "express"
import { incidentsRouter } from "../modules/incidents/incidents.router.js"
import { authRouter } from "../modules/auth/auth.routes.js"
import { requireAuth } from "../modules/auth/requireAuth.js"

export const apiRouter = Router()

apiRouter.get("/health", (_req, res) => {
    res.status(200).json({status:"ok"})
})
apiRouter.use("/auth", authRouter)
apiRouter.use("/incidents", requireAuth, incidentsRouter)