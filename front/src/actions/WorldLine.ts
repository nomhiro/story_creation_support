"use server"

import { redirect } from 'next/navigation'
import { WorldLine } from '../models/WorldLine'
import { getContainer } from '../utils/cosmosStoryCreation'

export interface FormState {
  error: string
}

// 新しい物語を登録する関数
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
// 引数 FormData: フォームデータを格納するためのオブジェクト
// export const createWorldLine = async (state: FormState, formData: FormData) => {
//     const newWorldLine: WorldLine = {
//         id: '',
//         world_line: formData.get('world_line') as string,
//         era: formData.get('era') as string,
//         country: formData.get('country') as string,
//         other: formData.get('other') as string,
//     };

//     try {
//         // 新しい物語を登録
//         const { resource: createdItem } = await getContainer('world_line').items.(newWorldLine);
//         console.log(`Created item: ${JSON.stringify(createdItem)}`);
//     } catch (error: any) {
//         // エラーが発生した場合はエラーメッセージを表示
//         state.error = error.message;
//         console.log('🚀 ~ createTask ~ error:', error);
//         return state;
//     };

//     redirect('/world_line');
// };

// 物語を新規登録/更新する関数
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
// 引数 FormData: フォームデータを格納するためのオブジェクト
export const upsertWorldLine = async (state: FormState, formData: FormData) => {
    
    const upsertedWorldLine: WorldLine = {
        world_line: formData.get('world_line') as string,
        era: formData.get('era') as string,
        country: formData.get('country') as string,
        other: formData.get('other') as string,
    };
    // 物語のIDが存在する場合はIDを追加
    if (formData.get('id')) {
        upsertedWorldLine.id = formData.get('id') as string;
    }
    console.log('🚀 ~ upsertWorldLine ~ upsertedWorldLine:', upsertedWorldLine);

    try {
        const { resource: upsertedItem } = await getContainer('world_line').items.upsert(upsertedWorldLine);
        console.log(`Upserted item: ${JSON.stringify(upsertedItem)}`);
    } catch (error: any) {
        // エラーが発生した場合はエラーメッセージを表示
        state.error = error.message;
        console.log('🚀 ~ updateTask ~ error:', error);
        return state;
    };

    redirect('/world_line');
};


// 物語を削除する関数
// 引数 id: 削除対象の物語のID
// 引数 state: エラーメッセージを格納するためのオブジェクト
// 引数 formData: フォームデータを格納するためのオブジェクト
export const deleteWorldLine = async (id: string, state: FormState, formData: FormData) => {
    try {
        // 引数idの物語を削除
        const { resource: deletedItem } = await getContainer('world_line').item(id, id).delete();
        console.log(`🚀 ~ deleteWorldLine ~ Deleted item`);
    } catch (error: any) {
        // エラーが発生した場合はエラーメッセージを表示
        state.error = error.message;
        console.log('🚀 ~ deleteTask ~ error:', error);
        return state;
    };

    redirect('/world_line');
};