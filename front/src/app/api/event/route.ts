import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { getContainer } from "../../../utils/cosmosStoryCreation";

export const GET = async (req: any, res: NextResponse) => {
    try {
        // クエリパラメータからworld_line_idを取得
        const url = new URL(req.url);
        const worldLineId = url.searchParams.get('world_line_id');

        // world_line_idが存在しない場合のエラーハンドリング
        if (!worldLineId) {
            return NextResponse.json({ error: 'world_line_id is required' }, { status: 400 });
        }

        // CosmosDBから指定されたworld_line_idの世界線を取得
        const querySpec = {
            query: 'SELECT * FROM c WHERE c.world_line_id = @world_line_id',
            parameters: [
                { name: '@world_line_id', value: worldLineId }
            ]
        };

        const { resources } = await getContainer('event').items.query(querySpec).fetchAll();
        return NextResponse.json({ resources }, { status: 200 });
    } catch (error: any) {
        console.log('🚀 ~ GET ~ error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// 
export const dynamic = 'force-dynamic'