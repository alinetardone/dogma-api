import { prisma } from "../../../database/prisma/client";
import { HeartRate } from "@prisma/client";
import { CreateHeartRateProps, UpdateHeartRateProps, DeleteHeartRateProps, GetHeartRateByPetIdProps, GetHeartRateByIdProps } from "../dtos/heartRateDTOs";

export class HeartRateRepository {

  async createHeartRate(props: CreateHeartRateProps): Promise<HeartRate> {
    const created = await prisma.heartRate.create({
      data: props
    });

    return created;
  }

  async updateHeartRate(props: UpdateHeartRateProps): Promise<HeartRate> {
    const updated = await prisma.heartRate.update({
      where: {
        id: props.id,
      },
      data: props.data,
    })

    return updated
  }

  async deleteHeartRate(props: DeleteHeartRateProps): Promise<HeartRate> {
    const deleted = await prisma.heartRate.delete({
      where: {
        id: props.id,
      }
    });

    return deleted;
  }

  async findHeartRateByPetId(props: GetHeartRateByPetIdProps): Promise<HeartRate[] | null> {
    const finded = await prisma.heartRate.findMany({
      where: {
        petId: props.petId
      }
    });

    return finded;
  }

  async findHeartRateById(props: GetHeartRateByIdProps): Promise<HeartRate | null> {
    const finded = await prisma.heartRate.findUnique({
      where: {
        id: props.id
      }
    });

    return finded;
  }
}
