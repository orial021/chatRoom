import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '2354',
  database: 'practicas',
  synchronize: true, // Otras opciones según tu configuración
})

export default dataSource