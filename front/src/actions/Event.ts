"use server"

import { redirect } from 'next/navigation'
import { Event } from '../models/Event'
import { getContainer } from '../utils/cosmosStoryCreation'

export interface FormState {
  error: string
}

// 出来事を新規登録/更新する関数
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
// 引数 FormData: フォームデータを格納するためのオブジェクト
export const upsertEvent = async (state: FormState, formData: FormData) => {
  console.log('🚀 ~ upsertEvent ~ formData:', formData);
    
  const upsertedEvent: Event = {
    event_title: formData.get('event_title') as string,
    date: formData.get('date') as string,
    characters: Array.from(formData.getAll('characters') as string[]),
    event_description: formData.get('event_description') as string,
    world_line_id: formData.get('world_line_id') as string,
  };
  // 出来事のIDが存在する場合はIDを追加
  if (formData.get('id')) {
    upsertedEvent.id = formData.get('id') as string;
  }
  console.log('🚀 ~ upsertEvent ~ upsertedEvent:', upsertedEvent);

  try {
    const { resource: upsertedItem } = await getContainer('event').items.upsert(upsertedEvent);
    console.log(`Upserted item: ${JSON.stringify(upsertedItem)}`);
  } catch (error: any) {
    // エラーが発生した場合はエラーメッセージを表示
    if (state) {
      state.error = error.message;
    }
    console.log('🚀 ~ updateEvent ~ error:', error);
  };

  redirect(`/events?world_line_id=${upsertedEvent.world_line_id}`);
};

// 出来事を削除する関数
// 引数 id: 削除する出来事のID
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
export const deleteEvent = async (id: string, world_line_id: string, state?: FormState) => {
  try {
    // 出来事を削除
    const { resource: deletedItem } = await getContainer('event').item(id, world_line_id).delete();
    console.log(`🚀 ~ deleteEvent ~ Deleted item`);
  } catch (error: any) {
    // エラーが発生した場合はエラーメッセージを表示
    if (state) {
      state.error = error.message;
    }
    console.log('🚀 ~ deleteEvent ~ error:', error.message, error.stack);
    return state;
  }

  redirect(`/events?world_line_id=${world_line_id}`);
};