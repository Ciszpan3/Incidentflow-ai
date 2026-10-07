import { Router } from "express"
import { incidentsRouter } from "../modules/incidents/incidents.router.js"

export const apiRouter = Router()

apiRouter.get("/health", (_req, res) => {
    res.status(200).json({status:"ok"})
})
apiRouter.use("/incidents", incidentsRouter)