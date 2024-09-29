"use server"

import { redirect } from 'next/navigation'

import { Story, StoryWithEvent } from '../models/Story'
import { getContainer } from './cosmosStoryCreation'
import { getEventById } from './eventService';

export interface FormState {
  error: string
}

// ストーリーを新規登録/更新する関数
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
// 引数 FormData: フォームデータを格納するためのオブジェクト
export const upsertStory = async (state: FormState, formData: FormData) => {
    
  const upsertedStory: Story = {
    story_title: formData.get('story_title') as string,
    story: formData.get('story') as string,
    story_summary: formData.get('story_summary') as string,
    events: Array.from(formData.getAll('events') as string[]),
    world_line_id: formData.get('world_line_id') as string,
  };
  // ストーリーのIDが存在する場合はIDを追加
  if (formData.get('id')) {
    upsertedStory.id = formData.get('id') as string;
  }
  console.log('🚀 ~ upsertStory ~ upsertedStory:', upsertedStory);

  try {
    const { resource: upsertedItem } = await getContainer('story').items.upsert(upsertedStory);
    console.log(`Upserted item: ${JSON.stringify(upsertedItem)}`);
  } catch (error: any) {
    // エラーが発生した場合はエラーメッセージを表示
    if (state) {
      state.error = error.message;
    }
    console.log('🚀 ~ updateStory ~ error:', error);
  };

  redirect(`/storys?world_line_id=${upsertedStory.world_line_id}`);
};

// 登場人物を削除する関数
// 引数 id: 削除する登場人物のID
// 引数 FormState: エラーメッセージを格納するためのオブジェクト
export const deleteStory = async (id: string, world_line_id: string, state?: FormState) => {
  try {
    // 登場人物を削除
    const { resource: deletedItem } = await getContainer('story').item(id, world_line_id).delete();
    console.log(`🚀 ~ deleteStory ~ Deleted item`);
  } catch (error: any) {
    // エラーが発生した場合はエラーメッセージを表示
    if (state) {
      state.error = error.message;
    }
    console.log('🚀 ~ deleteStory ~ error:', error.message, error.stack);
    return state;
  }

  redirect(`/storys?world_line_id=${world_line_id}`);
};

// api/storyエンドポイントからworld_line_idに紐づく登場人物を取得
export const getStorysByWorldLineId = async (worldLineId: string): Promise<Story[]> => {
  const response = await fetch(`/api/story?world_line_id=${encodeURIComponent(worldLineId)}`, {
    cache: 'no-store',
  });

  if(response.status !== 200) throw new Error('Failed to fetch tasks');

  const data = await response.json();
  return data.resources as Story[];
}

// api/storyエンドポイントからstory_idに紐づく登場人物を取得
export const getStoryById = async (storyId: string): Promise<Story> => {
  const response = await fetch(`/api/story/${encodeURIComponent(storyId)}`, {
    cache: 'no-store',
  });

  if(response.status !== 200) throw new Error('Failed to fetch tasks');

  const data = await response.json();
  return data.resources[0] as Story;
}


// api/storyエンドポイントからstoryのidに紐づく出来事を取得
// 取得したstoryのeventsリストのeventのidをキーにして、Eventエンドポイントから登場人物を取得
// 取得した登場人物名を追加したEventWithCharacterを返す
export const getStorysWithEventById = async (worldLineId: string): Promise<StoryWithEvent[]> => {
  const storys = await getStorysByWorldLineId(worldLineId);

  const storysWithEventName = await Promise.all(storys.map(async (story) => {
    const eventNames = await Promise.all(story.events.map(async (eventId) => {
      try {
        const event = await getEventById(eventId);
        if (!event || !event.event_title) {
          throw new Error(`Event with id ${eventId} not found or has no title`);
        }
        return event.event_title;
      } catch (error) {
        console.error(`Error fetching event with id ${eventId}:`, error);
        throw new Error(`Error fetching event with id ${eventId}: ${error}`);
      }
    }));

    return {
      ...story,
      event_names: eventNames,
    } as StoryWithEvent;
  }));

  return storysWithEventName;
}