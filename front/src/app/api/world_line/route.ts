import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { getContainer } from "../../../utils/cosmosStoryCreation";

export const GET = async (req: any, res: NextResponse) => {
    try {
        // CosmosDBから全ての世界線を取得
        const querySpec = {
            query: 'SELECT * FROM c',
        };

        const { resources } = await getContainer('world_line').items.query(querySpec).fetchAll();
        return NextResponse.json({ resources }, { status: 200 });
    } catch (error: any) {
        console.log('🚀 ~ GET ~ error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// 
export const dynamic = 'force-dynamic'