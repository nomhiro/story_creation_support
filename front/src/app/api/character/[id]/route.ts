import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { getContainer } from '../../../../utils/cosmosStoryCreation';

export const GET = async (_: NextRequest,{ params }:{params: {id: string}}) => {
  try {
    const querySpec = {
      query: `SELECT * FROM c WHERE c.id = "${params.id}"`,
    };

    const { resources } = await getContainer('character').items.query(querySpec).fetchAll();
    return NextResponse.json({ resources }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// 削除する登場人物のIDを取得し、CosmosDBから削除
export const DELETE = async (_: NextRequest,{ params }:{params: {id: string}}) => {
  try {
    // GETリクエストで取得したIDを使用して削除
    const { resources } = await getContainer('character').items.query({
      query: `SELECT * FROM c WHERE c.id = "${params.id}"`,
    }).fetchAll();

    if (resources.length === 0) {
      return NextResponse.json({ error: `Entity with id ${params.id} does not exist.` }, { status: 404 });
    }

    const item = resources[0];
    await getContainer('character').item(item.id, item.partitionKey).delete();

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.log('🚀 ~ DELETE ~ error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';