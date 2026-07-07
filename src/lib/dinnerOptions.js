import localDinnerOptions from '../data/dinnerOptions.json';
import { isSupabaseConfigured, supabase } from './supabase';

function mapDatabaseRow(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    scene: row.scene,
    budget: row.budget,
    moods: row.moods ?? [],
    flavors: row.flavors ?? [],
    groupSizes: row.group_sizes ?? [],
    hungerLevel: row.hunger_level,
    reason: row.reason,
    tips: row.tips,
    image: row.image,
  };
}

export async function loadDinnerOptions() {
  if (!isSupabaseConfigured) {
    return {
      options: localDinnerOptions,
      source: 'local',
    };
  }

  const { data, error } = await supabase
    .from('dinner_options')
    .select(
      'id,name,category,scene,budget,moods,flavors,group_sizes,hunger_level,reason,tips,image',
    )
    .eq('enabled', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (error || !data?.length) {
    console.warn('Falling back to local dinner options.', error);
    return {
      options: localDinnerOptions,
      source: 'local',
    };
  }

  return {
    options: data.map(mapDatabaseRow),
    source: 'supabase',
  };
}
