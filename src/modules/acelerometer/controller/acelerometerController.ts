import { Request, Response } from "express";
import { logger } from "../../../utils/logger";
import { AcelerometerUseCase } from "../useCases/acelerometerUseCase";

export class AcelerometerController {
    async create(req: Request, res: Response) {
        logger.info(req.body)
        const { collarId, x, y, z } = req.body;

        if (!collarId || !x || !y || !z) {
            throw new Error("Paramêtros inválidos")
        }

        const acelerometerUseCases = new AcelerometerUseCase();

        const result = await acelerometerUseCases.create({
            collarId,
            x, y, z
        });

        return res.status(201).json(result);
    }

    async update(req: Request, res: Response) {

        const { id } = req.params;
        const { data } = req.body;

        if (!id) {
            throw new Error("Paramêtros inválidos")
        }

        const acelerometerUseCases = new AcelerometerUseCase()

        const result = await acelerometerUseCases.update({ id, data })

        return res.status(200).json(result)
    }

    async delete(req: Request, res: Response) {

        const { id } = req.params;

        if (!id) {
            throw new Error("Paramêtros inválidos")
        }

        const acelerometerUseCases = new AcelerometerUseCase()

        const result = await acelerometerUseCases.delete({ id })

        return res.status(200).json(result)
    }

    async getAcelerometerByCollarId(req: Request, res: Response) {

        const { collarId } = req.params;

        if (!collarId) {
            throw new Error("Paramêtros inválidos")
        }

        const acelerometerUseCases = new AcelerometerUseCase();

        const result = await acelerometerUseCases.getAcelerometerByCollarId({ collarId });

        return res.status(200).json(result);
    }

    async getAcelerometerById(req: Request, res: Response) {

        const { id } = req.params;

        if (!id) {
            throw new Error("Paramêtros inválidos")
        }

        const acelerometerUseCases = new AcelerometerUseCase();

        const result = await acelerometerUseCases.getAcelerometerById({ id });

        return res.status(200).json(result);
    }

}