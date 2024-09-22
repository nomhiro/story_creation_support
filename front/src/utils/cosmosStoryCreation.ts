import { CosmosClient } from '@azure/cosmos';

// 引数で渡されたコンテナ名に応じて、適切なCosmosClientを返す関数

const endpoint = process.env.DATABASE_ENDPOINT!;
const key = process.env.DATABASE_API_KEY!;
const databaseId = 'story_creation';

export const getContainer = (containerId: string) => {
  return new CosmosClient({ endpoint, key }).database(databaseId).container(containerId);
};

// export const client = new CosmosClient({ endpoint, key });
// export const database = client.database(databaseId);
// export const container = database.container(containerId);