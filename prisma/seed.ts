import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {

  // Crear Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Tenant Principal'
    }
  })

  // Crear usuario asociado al tenant
  const hashedPassword = await bcrypt.hash('123456', 10)

  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@email.com',
       password:hashedPassword,
      tenantId: tenant.id,
      
    }
  })

  console.log('Seed ejecutado correctamente')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
