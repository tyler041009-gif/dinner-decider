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

const foodImages = {
  luosifen: new URL('./assets/foods/luosifen.png', import.meta.url).href,
  'bbq-rice': new URL('./assets/foods/bbq-rice.png', import.meta.url).href,
  'charcoal-bbq': new URL('./assets/foods/charcoal-bbq.png', import.meta.url).href,
  'sauerkraut-fish': new URL('./assets/foods/sauerkraut-fish.png', import.meta.url).href,
  'fried-skewers': new URL('./assets/foods/fried-skewers.png', import.meta.url).href,
  'xinjiang-rice-noodles': new URL('./assets/foods/xinjiang-rice-noodles.png', import.meta.url).href,
  burrito: new URL('./assets/foods/burrito.png', import.meta.url).href,
  'curry-omurice': new URL('./assets/foods/curry-omurice.png', import.meta.url).href,
  'grilled-fish': new URL('./assets/foods/grilled-fish.png', import.meta.url).href,
  oden: new URL('./assets/foods/oden.png', import.meta.url).href,
  'sweet-tea-cake': new URL('./assets/foods/sweet-tea-cake.png', import.meta.url).href,
  'roast-meat-rice': new URL('./assets/foods/roast-meat-rice.png', import.meta.url).href,
  'butter-chicken-rice': new URL('./assets/foods/butter-chicken-rice.png', import.meta.url).href,
  'shawarma-wrap': new URL('./assets/foods/shawarma-wrap.png', import.meta.url).href,
  'beef-pho': new URL('./assets/foods/beef-pho.png', import.meta.url).href,
  'banh-mi': new URL('./assets/foods/banh-mi.png', import.meta.url).href,
  'greek-pita': new URL('./assets/foods/greek-pita.png', import.meta.url).href,
  'doner-rice': new URL('./assets/foods/doner-rice.png', import.meta.url).href,
  'yunnan-rice-noodles': new URL('./assets/foods/yunnan-rice-noodles.png', import.meta.url).href,
  'roujiamo-liangpi': new URL('./assets/foods/roujiamo-liangpi.png', import.meta.url).href,
  'chaoshan-beef-kway-teow': new URL('./assets/foods/chaoshan-beef-kway-teow.png', import.meta.url).href,
  'northeast-dumplings': new URL('./assets/foods/northeast-dumplings.png', import.meta.url).href,
  'veggie-quinoa-tofu': new URL('./assets/foods/veggie-quinoa-tofu.png', import.meta.url).href,
  'seafood-paella': new URL('./assets/foods/seafood-paella.png', import.meta.url).href,
};

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
    groupSizes: ['solo', 'couple', 'group'],
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
  {
    id: 'luosifen',
    name: '螺蛳粉加料碗',
    category: '螺蛳粉',
    scene: 'delivery',
    budget: 'low',
    moods: ['spicy', 'reward', 'lazy'],
    flavors: ['spicy', 'savory'],
    groupSizes: ['solo'],
    hungerLevel: 'very',
    reason: '酸辣重口味很有存在感，适合想吃点有记忆点的晚上。',
    tips: '加腐竹和青菜就够完整，怕太冲可以备注少酸笋或另放辣油。',
    image: foodImages.luosifen,
  },
  {
    id: 'bbq-rice',
    name: '烤肉拌饭',
    category: '拌饭',
    scene: 'delivery',
    budget: 'low',
    moods: ['comfort', 'lazy', 'spicy'],
    flavors: ['savory', 'spicy'],
    groupSizes: ['solo'],
    hungerLevel: 'very',
    reason: '肉、饭、酱一起解决，顶饿又不需要复杂选择。',
    tips: '多加一份蔬菜或海苔碎，酱汁分装会更不腻。',
    image: foodImages['bbq-rice'],
  },
  {
    id: 'charcoal-bbq',
    name: '炭火烤肉局',
    category: '烤肉',
    scene: 'dine-in',
    budget: 'high',
    moods: ['reward', 'social', 'comfort'],
    flavors: ['savory', 'sweet'],
    groupSizes: ['couple', 'group'],
    hungerLevel: 'very',
    reason: '适合认真吃一顿，也适合把晚餐变成小聚会。',
    tips: '先点拼盘再补单品，配生菜和泡菜会比全程吃肉更舒服。',
    image: foodImages['charcoal-bbq'],
  },
  {
    id: 'sauerkraut-fish',
    name: '酸菜鱼双人锅',
    category: '酸菜鱼',
    scene: 'both',
    budget: 'medium',
    moods: ['fresh', 'spicy', 'social'],
    flavors: ['fresh', 'spicy', 'savory'],
    groupSizes: ['couple', 'group'],
    hungerLevel: 'normal',
    reason: '酸爽开胃，比火锅轻一点，但共享感还在。',
    tips: '两个人选小份鱼加一份粉，外卖备注鱼片和汤分开更稳。',
    image: foodImages['sauerkraut-fish'],
  },
  {
    id: 'fried-skewers',
    name: '炸串小食盒',
    category: '炸串',
    scene: 'delivery',
    budget: 'low',
    moods: ['reward', 'lazy', 'social'],
    flavors: ['savory', 'spicy'],
    groupSizes: ['solo', 'couple', 'group'],
    hungerLevel: 'normal',
    reason: '快乐来得很快，适合不想吃正餐但又想有点仪式感。',
    tips: '荤素各半，再加一份主食或饮料，别只点淀粉串。',
    image: foodImages['fried-skewers'],
  },
  {
    id: 'xinjiang-rice-noodles',
    name: '新疆炒米粉',
    category: '炒米粉',
    scene: 'delivery',
    budget: 'low',
    moods: ['spicy', 'reward', 'comfort'],
    flavors: ['spicy', 'savory'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'very',
    reason: '酱香和辣度都很直接，适合很饿又想吃重口的一餐。',
    tips: '第一次点选中辣更稳，加鸡肉或牛肉比单加米粉更满足。',
    image: foodImages['xinjiang-rice-noodles'],
  },
  {
    id: 'burrito',
    name: '墨西哥卷饼',
    category: '卷饼',
    scene: 'delivery',
    budget: 'medium',
    moods: ['fresh', 'lazy', 'reward'],
    flavors: ['fresh', 'savory'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '拿起来就能吃，蔬菜、肉和酱料都在一个卷里。',
    tips: '选鸡肉或牛肉基底，酱料少一点，外卖路上不容易塌。',
    image: foodImages.burrito,
  },
  {
    id: 'curry-omurice',
    name: '咖喱蛋包饭',
    category: '咖喱饭',
    scene: 'both',
    budget: 'medium',
    moods: ['comfort', 'reward', 'quiet'],
    flavors: ['savory', 'sweet'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '软乎乎、热乎乎，适合想要一点安慰感的晚餐。',
    tips: '选猪排或鸡排会更顶饿，咖喱酱不够可以备注多一点。',
    image: foodImages['curry-omurice'],
  },
  {
    id: 'grilled-fish',
    name: '烤鱼小锅',
    category: '烤鱼',
    scene: 'dine-in',
    budget: 'high',
    moods: ['spicy', 'social', 'reward'],
    flavors: ['spicy', 'savory'],
    groupSizes: ['couple', 'group'],
    hungerLevel: 'very',
    reason: '有锅气、有配菜、有分享感，适合不想吃火锅但想热闹一点。',
    tips: '两三个人点一条鱼加豆皮、土豆和青菜，主食最后再看胃口。',
    image: foodImages['grilled-fish'],
  },
  {
    id: 'oden',
    name: '关东煮便利餐',
    category: '关东煮',
    scene: 'both',
    budget: 'low',
    moods: ['comfort', 'quiet', 'lazy'],
    flavors: ['light', 'savory'],
    groupSizes: ['solo'],
    hungerLevel: 'light',
    reason: '热汤和小份量很友好，适合想轻轻吃但不想只喝粥。',
    tips: '豆腐、萝卜、蛋白类各选一点，再配饭团会更像一餐。',
    image: foodImages.oden,
  },
  {
    id: 'sweet-tea-cake',
    name: '奶茶甜品轻晚餐',
    category: '甜品饮品',
    scene: 'delivery',
    budget: 'medium',
    moods: ['reward', 'lazy', 'quiet'],
    flavors: ['sweet', 'fresh'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'light',
    reason: '不算正经大餐，但很适合只想给今天一点甜头的夜晚。',
    tips: '奶茶选半糖，再配三明治或小蛋糕，别让晚饭只剩一杯糖。',
    image: foodImages['sweet-tea-cake'],
  },
  {
    id: 'roast-meat-rice',
    name: '粤式烧腊饭',
    category: '烧腊',
    scene: 'both',
    budget: 'medium',
    moods: ['comfort', 'lazy', 'reward'],
    flavors: ['savory', 'sweet'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '烧鸭、叉烧和米饭的组合稳定可靠，适合想吃香一点但不想冒险。',
    tips: '双拼比单拼更有层次，加青菜和例汤就是完整晚餐。',
    image: foodImages['roast-meat-rice'],
  },
  {
    id: 'butter-chicken-rice',
    name: '印度黄油鸡饭',
    category: '印度菜',
    scene: 'both',
    budget: 'medium',
    moods: ['comfort', 'reward', 'quiet'],
    flavors: ['savory', 'sweet'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '奶香咖喱和米饭很有安慰感，适合想换个香料频道的晚上。',
    tips: '搭配烤饼或一份蔬菜，酱汁多一点会更适合拌饭。',
    image: foodImages['butter-chicken-rice'],
  },
  {
    id: 'shawarma-wrap',
    name: '中东沙威玛卷',
    category: '中东风味',
    scene: 'delivery',
    budget: 'medium',
    moods: ['fresh', 'lazy', 'reward'],
    flavors: ['fresh', 'savory'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '烤肉、蔬菜和酸奶酱包在一起，清爽但不会空虚。',
    tips: '酱料另放更稳，想更顶饿可以加薯角或鹰嘴豆泥。',
    image: foodImages['shawarma-wrap'],
  },
  {
    id: 'beef-pho',
    name: '越南牛肉河粉',
    category: '越南菜',
    scene: 'both',
    budget: 'medium',
    moods: ['fresh', 'comfort', 'quiet'],
    flavors: ['fresh', 'light'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '汤底清亮、香草提神，适合想吃热乎但不想太重的晚餐。',
    tips: '外卖备注汤粉分装，挤点青柠会更醒胃。',
    image: foodImages['beef-pho'],
  },
  {
    id: 'banh-mi',
    name: '越南法棍三明治',
    category: '越南菜',
    scene: 'delivery',
    budget: 'low',
    moods: ['fresh', 'lazy', 'quiet'],
    flavors: ['fresh', 'savory'],
    groupSizes: ['solo'],
    hungerLevel: 'light',
    reason: '脆面包、腌菜和肉馅很利落，适合不想吃太满的一餐。',
    tips: '选鸡肉或牛肉馅，怕晚点饿就加一杯汤或小食。',
    image: foodImages['banh-mi'],
  },
  {
    id: 'greek-pita',
    name: '希腊烤肉皮塔',
    category: '地中海菜',
    scene: 'both',
    budget: 'medium',
    moods: ['fresh', 'social', 'reward'],
    flavors: ['fresh', 'savory'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '烤肉、蔬菜和酸奶酱很平衡，清爽又有满足感。',
    tips: '配沙拉或烤蔬菜，比单点肉卷更像一顿完整晚餐。',
    image: foodImages['greek-pita'],
  },
  {
    id: 'doner-rice',
    name: '土耳其烤肉饭',
    category: '土耳其菜',
    scene: 'delivery',
    budget: 'medium',
    moods: ['comfort', 'lazy', 'reward'],
    flavors: ['savory', 'spicy'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'very',
    reason: '烤肉和米饭的组合直接顶饿，适合不想复杂点菜的时候。',
    tips: '加蔬菜和酸奶酱能解腻，辣酱单独放更好控。',
    image: foodImages['doner-rice'],
  },
  {
    id: 'yunnan-rice-noodles',
    name: '云南过桥米线',
    category: '云南菜',
    scene: 'dine-in',
    budget: 'medium',
    moods: ['comfort', 'fresh', 'quiet'],
    flavors: ['light', 'fresh'],
    groupSizes: ['solo', 'couple', 'group'],
    hungerLevel: 'normal',
    reason: '汤、米线和小料分层上桌，温和又有一点仪式感。',
    tips: '堂食体验更好，先下肉片再下蔬菜和米线。',
    image: foodImages['yunnan-rice-noodles'],
  },
  {
    id: 'roujiamo-liangpi',
    name: '陕西肉夹馍凉皮组',
    category: '陕西小吃',
    scene: 'both',
    budget: 'low',
    moods: ['fresh', 'comfort', 'lazy'],
    flavors: ['fresh', 'savory'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'normal',
    reason: '一个扎实一个清爽，组合起来比单点主食更有层次。',
    tips: '凉皮少辣多醋更开胃，肉夹馍趁热吃口感最好。',
    image: foodImages['roujiamo-liangpi'],
  },
  {
    id: 'chaoshan-beef-kway-teow',
    name: '潮汕牛肉粿条',
    category: '潮汕菜',
    scene: 'dine-in',
    budget: 'medium',
    moods: ['comfort', 'fresh', 'quiet'],
    flavors: ['fresh', 'light'],
    groupSizes: ['solo', 'couple', 'group'],
    hungerLevel: 'normal',
    reason: '牛肉鲜、汤底清，适合想认真吃但不想重油重辣的时候。',
    tips: '堂食点现切牛肉更稳，配沙茶酱但别盖过汤味。',
    image: foodImages['chaoshan-beef-kway-teow'],
  },
  {
    id: 'northeast-dumplings',
    name: '东北饺子小菜',
    category: '东北菜',
    scene: 'both',
    budget: 'low',
    moods: ['comfort', 'social', 'quiet'],
    flavors: ['savory', 'light'],
    groupSizes: ['solo', 'couple', 'group'],
    hungerLevel: 'normal',
    reason: '热饺子和小凉菜很有家常感，一个人或多人都不尴尬。',
    tips: '点一份酸辣小菜配饺子，外卖记得要醋和蒜泥。',
    image: foodImages['northeast-dumplings'],
  },
  {
    id: 'veggie-quinoa-tofu',
    name: '素食藜麦豆腐碗',
    category: '素食轻食',
    scene: 'delivery',
    budget: 'medium',
    moods: ['fresh', 'quiet', 'lazy'],
    flavors: ['fresh', 'light'],
    groupSizes: ['solo', 'couple'],
    hungerLevel: 'light',
    reason: '有蛋白、有谷物、有蔬菜，适合想轻负担但不想只吃草。',
    tips: '酱汁单独放，豆腐或鹰嘴豆加量会更抗饿。',
    image: foodImages['veggie-quinoa-tofu'],
  },
  {
    id: 'seafood-paella',
    name: '西班牙海鲜饭',
    category: '西班牙菜',
    scene: 'dine-in',
    budget: 'high',
    moods: ['reward', 'social', 'fresh'],
    flavors: ['fresh', 'savory'],
    groupSizes: ['couple', 'group'],
    hungerLevel: 'normal',
    reason: '海鲜和米饭很有分享感，适合把普通晚餐升级一下。',
    tips: '两个人以上点更划算，配一份沙拉或烤蔬菜会更清爽。',
    image: foodImages['seafood-paella'],
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

function isImageAsset(image) {
  return typeof image === 'string' && image.includes('/assets/');
}

const diverseOptionIds = new Set([
  'butter-chicken-rice',
  'shawarma-wrap',
  'beef-pho',
  'banh-mi',
  'greek-pita',
  'doner-rice',
  'yunnan-rice-noodles',
  'roujiamo-liangpi',
  'chaoshan-beef-kway-teow',
  'northeast-dumplings',
  'veggie-quinoa-tofu',
  'seafood-paella',
]);

function getMatchScore(option, selections) {
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

  return score;
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
  const scoredOptions = dinnerOptions.map((option) => ({
    ...option,
    matchScore: getMatchScore(option, selections),
    noise: seededNoise(option.id, shuffleSeed),
  }));
  const maxMatchScore = Math.max(...scoredOptions.map((option) => option.matchScore));
  const ranked = [...dinnerOptions]
    .map((option) => {
      const scoredOption = scoredOptions.find((candidate) => candidate.id === option.id);
      const diversityBoost =
        activeCount &&
        scoredOption.matchScore === maxMatchScore &&
        diverseOptionIds.has(option.id)
          ? 1.85
          : 0;

      return {
        ...option,
        score: scoredOption.matchScore + scoredOption.noise + diversityBoost,
      };
    })
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
                  {isImageAsset(option.image) ? <img src={option.image} alt="" /> : option.image}
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
