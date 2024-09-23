import { CosmosClient } from '@azure/cosmos';

// 引数で渡されたコンテナ名に応じて、適切なCosmosClientを返す関数

const endpoint = process.env.DATABASE_ENDPOINT!;
const key = process.env.DATABASE_API_KEY!;
const databaseId = 'story-creation';

export const getContainer = (containerId: string) => {
  try {
    return new CosmosClient({ endpoint, key }).database(databaseId).container(containerId);
  } catch (error: any) {
    console.error('Error getting container:', error.message);
    throw error;
  }
};