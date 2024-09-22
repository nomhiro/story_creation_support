"use server"

import { redirect } from 'next/navigation'
import { WorldLine } from '../models/WorldLine'
import { getContainer } from '../utils/cosmosStoryCreation'

export interface FormState {
  error: string
}

// 新しい世界線を登録する関数
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
// 引数 FormData: フォームデータを格納するためのオブジェクト
export const createWorldLine = async (state: FormState, formData: FormData) => {
    const newWorldLine: WorldLine = {
        id: '',
        world_line: formData.get('world_line') as string,
        era: formData.get('era') as string,
        country: formData.get('country') as string,
        other: formData.get('other') as string,
    };

    try {
        // 新しい世界線を登録
        const { resource: createdItem } = await getContainer('world_line').items.create(newWorldLine);
        console.log(`Created item: ${JSON.stringify(createdItem)}`);
    } catch (error: any) {
        // エラーが発生した場合はエラーメッセージを表示
        state.error = error.message;
        console.log('🚀 ~ createTask ~ error:', error);
        return state;
    };

    redirect('/world_line');
};

// 世界線を更新する関数
// 引数 id: 更新対象の世界線のID
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
// 引数 FormData: フォームデータを格納するためのオブジェクト
export const updateWorldLine = async (id: string, state: FormState, formData: FormData) => {
    const updatedWorldLine: WorldLine = {
        world_line: formData.get('world_line') as string,
        era: formData.get('era') as string,
        country: formData.get('country') as string,
        other: formData.get('other') as string,
    };

    try {
        // 更新対象の世界線を取得
        const { resource: existingItem } = await getContainer('world_line').item(id, id).read();

        // 更新データをマージしてドキュメントを更新
        const updatedItem = { ...existingItem, ...updatedWorldLine };
        const { resource: replacedItem } = await getContainer('world_line').item(id, id).replace(updatedItem);
        console.log(`Updated item: ${JSON.stringify(updatedItem)}`);
    } catch (error: any) {
        // エラーが発生した場合はエラーメッセージを表示
        state.error = error.message;
        console.log('🚀 ~ updateTask ~ error:', error);
        return state;
    };

    redirect('/world_line');
};


// 世界線を削除する関数
// 引数 id: 削除対象の世界線のID
// 引数 state: エラーメッセージを格納するためのオブジェクト
// 引数 formData: フォームデータを格納するためのオブジェクト
export const deleteWorldLine = async (id: string, state: FormState, formData: FormData) => {
    try {
        // 引数idの世界線を削除
        const { resource: deletedItem } = await getContainer('world_line').item(id, id).delete();
        console.log(`Deleted item: ${JSON.stringify(deletedItem)}`);
    } catch (error: any) {
        // エラーが発生した場合はエラーメッセージを表示
        state.error = error.message;
        console.log('🚀 ~ deleteTask ~ error:', error);
        return state;
    };

    redirect('/world_line');
};