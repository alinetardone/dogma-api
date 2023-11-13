import { Request, Response } from "express";
import { logger } from "../../../utils/logger";
import { SoundUseCase } from "../useCases/soundUseCase";
import { CollarUseCase } from "../../collar/useCases/collarUseCase";

export class SoundController {
    async create(req: Request, res: Response) {

        const { token, value } = req.body;

        if (!token || !value ) {
            throw new Error("Paramêtros inválidos")
        }

        const CollarUseCases = new CollarUseCase()
        const collar = await CollarUseCases.getCollarByToken(token)

        const soundUseCases = new SoundUseCase();

        const result = await soundUseCases.create({
            collarId: collar.id,
            value
        });

        return res.status(201).json(result);
    }

    async update(req: Request, res: Response) {

        const { id } = req.params;
        const { data } = req.body;

        if (!id) {
            throw new Error("Paramêtros inválidos")
        }

        const soundUseCases = new SoundUseCase()

        const result = await soundUseCases.update({ id, data })

        return res.status(200).json(result)
    }

    async delete(req: Request, res: Response) {

        const { id } = req.params;

        if (!id) {
            throw new Error("Paramêtros inválidos")
        }

        const soundUseCases = new SoundUseCase()

        const result = await soundUseCases.delete({ id })

        return res.status(200).json(result)
    }

    async getSoundByCollarId(req: Request, res: Response) {

        const { collarId } = req.params;

        if (!collarId) {
            throw new Error("Paramêtros inválidos")
        }

        const soundUseCases = new SoundUseCase();

        const result = await soundUseCases.getSoundByCollarId({ collarId });

        return res.status(200).json(result);
    }

    async getSoundById(req: Request, res: Response) {

        const { id } = req.params;

        if (!id) {
            throw new Error("Paramêtros inválidos")
        }

        const soundUseCases = new SoundUseCase();

        const result = await soundUseCases.getSoundById({ id });

        return res.status(200).json(result);
    }

}