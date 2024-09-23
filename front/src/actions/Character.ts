"use server"

import { redirect } from 'next/navigation'
import { Character } from '../models/Character'
import { getContainer } from '../utils/cosmosStoryCreation'

export interface FormState {
  error: string
}

// 登場人物を新規登録/更新する関数
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
// 引数 FormData: フォームデータを格納するためのオブジェクト
export const upsertCharacter = async (state: FormState, formData: FormData) => {
    
  const upsertedCharacter: Character = {
    name: formData.get('name') as string,
    gender: formData.get('gender') as 'male' | 'female' | 'other',
    age: parseInt(formData.get('age') as string, 10),
    personality: formData.get('personality') as string,
    other: formData.get('other') as string,
    world_line_id: formData.get('world_line_id') as string,
  };
  // 登場人物のIDが存在する場合はIDを追加
  if (formData.get('id')) {
    upsertedCharacter.id = formData.get('id') as string;
  }
  console.log('🚀 ~ upsertCharacter ~ upsertedCharacter:', upsertedCharacter);

  try {
    const { resource: upsertedItem } = await getContainer('character').items.upsert(upsertedCharacter);
    console.log(`Upserted item: ${JSON.stringify(upsertedItem)}`);
  } catch (error: any) {
    // エラーが発生した場合はエラーメッセージを表示
    if (state) {
      state.error = error.message;
    }
    console.log('🚀 ~ updateCharacter ~ error:', error);
  };

  redirect(`/characters?world_line_id=${upsertedCharacter.world_line_id}`);
};

// 登場人物を削除する関数
// 引数 id: 削除する登場人物のID
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
export const deleteCharacter = async (id: string, world_line_id: string, state?: FormState) => {
  try {
    // 登場人物を削除
    const { resource: deletedItem } = await getContainer('character').item(id, id).delete();
    console.log(`🚀 ~ deleteCharacter ~ Deleted item`);
  } catch (error: any) {
    // エラーが発生した場合はエラーメッセージを表示
    if (state) {
      state.error = error.message;
    }
    console.log('🚀 ~ deleteCharacter ~ error:', error.message, error.stack);
    return state;
  }

  redirect(`/characters?world_line_id=${world_line_id}`);
};