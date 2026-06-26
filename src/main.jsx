import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Banknote,
  ChefHat,
  Flame,
  Heart,
  MapPin,
  RefreshCw,
  Sparkles,
  Star,
  Utensils,
  Users,
} from 'lucide-react';
import heroImage from './assets/dinner-cards-hero.png';
import './styles.css';

const dinnerOptions = [
  {
    id: 'hotpot',
    name: '热辣小火锅',
    category: '火锅',
    scene: 'dine-in',
    budget: 'high',
    moods: ['comfort', 'social', 'spicy'],
    flavors: ['spicy', 'savory'],
    groupSizes: ['couple', 'group'],
    hungerLevel: 'very',
    reason: '热气和蘸料能迅速把晚上的犹豫清空，特别适合多人一起吃。',
    tips: '选鸳鸯锅，点一份蔬菜拼盘和主食，别让预算在肥牛上失控。',
    image: '🍲',
  },
  {
    id: 'malatang',
    name: '自选麻辣烫',
    category: '麻辣烫',
    scene: 'delivery',
    budget: 'low',
    moods: ['spicy', 'comfort', 'lazy'],
    flavors: ['spicy', 'savory'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'very',
    reason: '自由度高、出餐快，想吃重口味但不想认真点菜时很稳。',
    tips: '先选蛋白和绿叶菜，再加一份粉面，汤底选微辣更不容易翻车。',
    image: '🥘',
  },
  {
    id: 'bbq',
    name: '夜宵烧烤拼盘',
    category: '烧烤',
    scene: 'both',
    budget: 'medium',
    moods: ['social', 'spicy', 'reward'],
    flavors: ['spicy', 'savory'],
    groupSizes: ['couple', 'group'],
    hungerLevel: 'normal',
    reason: '适合边吃边聊天，碳烤香气会让普通晚上变得像小聚会。',
    tips: '点肉串、烤蔬菜和一份主食，外卖备注少油少盐会舒服很多。',
    image: '🍢',
  },
  {
    id: 'sushi',
    name: '寿司刺身便当',
    category: '日料',
    scene: 'both',
    budget: 'high',
    moods: ['fresh', 'reward', 'quiet'],
    flavors: ['fresh', 'light'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '清爽、有仪式感，不会把晚餐吃成一场战斗。',
    tips: '很饿就搭配乌冬或茶碗蒸，单吃寿司可能后半夜想加餐。',
    image: '🍣',
  },
  {
    id: 'korean',
    name: '韩式拌饭炸鸡组',
    category: '韩餐',
    scene: 'delivery',
    budget: 'medium',
    moods: ['reward', 'comfort', 'social'],
    flavors: ['savory', 'sweet'],
    groupSizes: ['solo', 'couple', 'group'],
    hungerLevel: 'very',
    reason: '拌饭负责踏实，炸鸡负责快乐，适合需要一点奖励的晚上。',
    tips: '两个人点半份炸鸡加一份拌饭，快乐和负担都刚刚好。',
    image: '🍗',
  },
  {
    id: 'noodles',
    name: '牛肉粉面套餐',
    category: '粥粉面',
    scene: 'delivery',
    budget: 'low',
    moods: ['lazy', 'comfort', 'quiet'],
    flavors: ['savory', 'light'],
    groupSizes: ['solo'],
    hungerLevel: 'normal',
    reason: '快、暖、稳定，是不想冒险时的晚餐保险牌。',
    tips: '加蛋或牛肉比盲目加大份更划算，汤粉外卖记得备注汤面分装。',
    image: '🍜',
  },
  {
    id: 'salad',
    name: '轻食能量碗',
    category: '轻食',
    scene: 'delivery',
    budget: 'medium',
    moods: ['fresh', 'quiet', 'lazy'],
    flavors: ['light', 'fresh'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'light',
    reason: '适合想吃干净一点、又不想真的做饭的夜晚。',
    tips: '优先选鸡胸、牛肉或豆腐这类蛋白，酱汁单独放更好控制味道。',
    image: '🥗',
  },
  {
    id: 'burger',
    name: '炸鸡汉堡套餐',
    category: '炸鸡汉堡',
    scene: 'delivery',
    budget: 'medium',
    moods: ['reward', 'lazy', 'comfort'],
    flavors: ['savory', 'sweet'],
    groupSizes: ['solo', 'couple', 'group'],
    hungerLevel: 'very',
    reason: '不用思考、满足感强，适合今天脑力已经见底的时候。',
    tips: '换无糖饮料或少点一份薯条，快乐不会少太多。',
    image: '🍔',
  },
  {
    id: 'home-style',
    name: '家常炒菜盖饭',
    category: '家常菜',
    scene: 'both',
    budget: 'low',
    moods: ['comfort', 'quiet', 'lazy'],
    flavors: ['savory', 'light'],
    groupSizes: ['solo', 'couple', 'group'],
    hungerLevel: 'normal',
    reason: '像认真吃了一顿饭，但决策成本很低。',
    tips: '一荤一素配米饭最稳，堂食可以看看今日例汤。',
    image: '🍛',
  },
  {
    id: 'thai',
    name: '泰式酸辣套餐',
    category: '东南亚菜',
    scene: 'both',
    budget: 'medium',
    moods: ['fresh', 'reward', 'spicy'],
    flavors: ['spicy', 'fresh', 'sweet'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '酸辣和香草味会把味觉叫醒，适合想换个频道的晚上。',
    tips: '冬阴功、炒河粉和青木瓜沙拉三选二，就很有完成度。',
    image: '🍤',
  },
  {
    id: 'congee',
    name: '砂锅粥小菜',
    category: '粥点',
    scene: 'both',
    budget: 'medium',
    moods: ['quiet', 'comfort', 'fresh'],
    flavors: ['light', 'fresh'],
    groupSizes: ['solo', 'couple', 'group'],
    hungerLevel: 'light',
    reason: '温和、不刺激，适合加班后或者胃口不太野的晚上。',
    tips: '配蒸点和青菜，堂食比外卖口感更好。',
    image: '🥣',
  },
  {
    id: 'pizza',
    name: '披萨分享盒',
    category: '披萨',
    scene: 'delivery',
    budget: 'high',
    moods: ['social', 'reward', 'lazy'],
    flavors: ['savory', 'sweet'],
    groupSizes: ['couple', 'group'],
    hungerLevel: 'very',
    reason: '适合多人分食，也适合边看剧边解决晚饭。',
    tips: '选一个经典口味加一个清爽小食，比全肉披萨更耐吃。',
    image: '🍕',
  },
];

const filters = {
  mood: {
    label: '今晚状态',
    icon: Heart,
    options: [
      { value: 'comfort', label: '想被安慰' },
      { value: 'reward', label: '想奖励自己' },
      { value: 'lazy', label: '不想动脑' },
      { value: 'fresh', label: '想清爽点' },
      { value: 'social', label: '有人一起' },
      { value: 'spicy', label: '想来点狠的' },
    ],
  },
  budget: {
    label: '预算',
    icon: Banknote,
    options: [
      { value: 'low', label: '省一点' },
      { value: 'medium', label: '正常吃' },
      { value: 'high', label: '今晚可以' },
    ],
  },
  hunger: {
    label: '饥饿程度',
    icon: Flame,
    options: [
      { value: 'light', label: '轻轻吃' },
      { value: 'normal', label: '正常饿' },
      { value: 'very', label: '已经很饿' },
    ],
  },
  group: {
    label: '人数',
    icon: Users,
    options: [
      { value: 'solo', label: '一个人' },
      { value: 'couple', label: '两个人' },
      { value: 'group', label: '一群人' },
    ],
  },
  scene: {
    label: '行动半径',
    icon: MapPin,
    options: [
      { value: 'delivery', label: '不想出门' },
      { value: 'dine-in', label: '愿意堂食' },
    ],
  },
  flavor: {
    label: '口味',
    icon: ChefHat,
    options: [
      { value: 'spicy', label: '辣' },
      { value: 'savory', label: '咸香' },
      { value: 'light', label: '清淡' },
      { value: 'fresh', label: '鲜爽' },
      { value: 'sweet', label: '带点甜' },
    ],
  },
};

const defaultSelections = {
  mood: '',
  budget: '',
  hunger: '',
  group: '',
  scene: '',
  flavor: '',
};

const budgetLabels = {
  low: '低预算',
  medium: '中预算',
  high: '高预算',
};

const sceneLabels = {
  delivery: '外卖更合适',
  'dine-in': '堂食更合适',
  both: '外卖/堂食都行',
};

function scoreOption(option, selections, shuffleSeed) {
  let score = 0;

  if (selections.mood && option.moods.includes(selections.mood)) score += 4;
  if (selections.budget && option.budget === selections.budget) score += 3;
  if (selections.hunger && option.hungerLevel === selections.hunger) score += 2;
  if (selections.group && option.groupSizes.includes(selections.group)) score += 2;
  if (selections.flavor && option.flavors.includes(selections.flavor)) score += 3;
  if (selections.scene && (option.scene === selections.scene || option.scene === 'both')) score += 3;

  if (!Object.values(selections).some(Boolean)) {
    score += option.id === 'malatang' || option.id === 'home-style' || option.id === 'thai' ? 2 : 0;
  }

  return score + seededNoise(option.id, shuffleSeed);
}

function seededNoise(text, seed) {
  let hash = seed * 31;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 33 + text.charCodeAt(index)) % 997;
  }
  return (hash / 997) * 2.4;
}

function getRecommendations(selections, shuffleSeed) {
  const activeCount = Object.values(selections).filter(Boolean).length;
  const ranked = [...dinnerOptions]
    .map((option) => ({
      ...option,
      score: scoreOption(option, selections, shuffleSeed),
    }))
    .sort((a, b) => b.score - a.score);

  const candidatePool = ranked.slice(0, 8);
  const rotatedCandidates = activeCount
    ? ranked
    : [
        ...candidatePool.slice(shuffleSeed % candidatePool.length),
        ...candidatePool.slice(0, shuffleSeed % candidatePool.length),
        ...ranked.slice(candidatePool.length),
      ];
  const picked = [];
  const usedCategories = new Set();

  for (const option of rotatedCandidates) {
    if (picked.length >= 3) break;
    if (!usedCategories.has(option.category) || ranked.length - picked.length <= 3) {
      picked.push(option);
      usedCategories.add(option.category);
    }
  }

  return picked;
}

function App() {
  const [selections, setSelections] = useState(defaultSelections);
  const [shuffleSeed, setShuffleSeed] = useState(7);
  const recommendations = useMemo(
    () => getRecommendations(selections, shuffleSeed),
    [selections, shuffleSeed],
  );

  const activeCount = Object.values(selections).filter(Boolean).length;

  function chooseFilter(group, value) {
    setSelections((current) => ({
      ...current,
      [group]: current[group] === value ? '' : value,
    }));
  }

  function reroll() {
    setShuffleSeed((current) => current + 1);
  }

  function reset() {
    setSelections(defaultSelections);
    setShuffleSeed((current) => current + 3);
  }

  return (
    <main className="app-shell">
      <section className="hero" aria-label="今晚吃什么推荐器">
        <img className="hero__art" src={heroImage} alt="可爱风格的晚餐食物拼贴" />
        <div className="hero__shade" />
        <div className="hero__content">
          <div className="mode-pill">
            <Sparkles size={16} />
            外卖 / 堂食 · 快速抽卡
          </div>
          <h1>今晚吃什么</h1>
          <p>点几下偏好，给你三张靠谱饭票。好玩一点，但不是乱猜。</p>
        </div>
      </section>

      <section className="decision-board" aria-label="晚餐筛选和推荐结果">
        <div className="filters-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">STEP 01</p>
              <h2>先选今晚的状态</h2>
            </div>
            <button className="icon-button" type="button" onClick={reset} aria-label="重置筛选">
              <RefreshCw size={18} />
            </button>
          </div>

          <div className="filter-groups">
            {Object.entries(filters).map(([key, group]) => {
              const Icon = group.icon;
              return (
                <fieldset className="filter-group" key={key}>
                  <legend>
                    <Icon size={16} />
                    {group.label}
                  </legend>
                  <div className="choice-grid">
                    {group.options.map((option) => (
                      <button
                        className={selections[key] === option.value ? 'choice is-active' : 'choice'}
                        key={option.value}
                        type="button"
                        onClick={() => chooseFilter(key, option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              );
            })}
          </div>
        </div>

        <div className="results-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">STEP 02</p>
              <h2>抽到这三张饭票</h2>
            </div>
            <button className="reroll-button" type="button" onClick={reroll}>
              <RefreshCw size={18} />
              换一批
            </button>
          </div>

          <div className="status-strip">
            <Star size={16} />
            {activeCount ? `已根据 ${activeCount} 个偏好推荐` : '未选择也可以，先给你默认灵感'}
          </div>

          <div className="recommendation-grid">
            {recommendations.map((option, index) => (
              <article className="food-card" key={`${option.id}-${shuffleSeed}`}>
                <div className="card-topline">
                  <span className="rank-badge">#{index + 1}</span>
                  <span className="scene-badge">{sceneLabels[option.scene]}</span>
                </div>
                <div className="food-visual" aria-hidden="true">
                  {option.image}
                </div>
                <h3>{option.name}</h3>
                <p className="category">{option.category}</p>
                <p className="reason">{option.reason}</p>
                <div className="tag-row">
                  <span>{budgetLabels[option.budget]}</span>
                  <span>{option.hungerLevel === 'very' ? '很顶饿' : option.hungerLevel === 'light' ? '轻负担' : '刚刚好'}</span>
                  <span>{option.groupSizes.includes('group') ? '可多人' : '适合小局'}</span>
                </div>
                <div className="tip-box">
                  <Utensils size={16} />
                  <span>{option.tips}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
