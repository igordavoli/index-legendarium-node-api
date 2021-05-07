import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const options = await getConnectionOptions();

  return createConnection(options);
};