import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Banknote,
  ChefHat,
  X,
  LogIn,
  LogOut,
  Flame,
  Heart,
  MapPin,
  Save,
  RefreshCw,
  Sparkles,
  Star,
  Utensils,
  Users,
} from 'lucide-react';
import heroImage from './assets/dinner-cards-hero.png';
import {
  getCurrentUser,
  listenToAuthChanges,
  loadUserPreferences,
  saveUserPreferences,
  sendLoginCode,
  signOut,
  verifyLoginCode,
} from './lib/auth';
import { loadDinnerOptions } from './lib/dinnerOptions';
import { isSupabaseConfigured } from './lib/supabase';
import './styles.css';

const foodImages = {
  hotpot: new URL('./assets/foods/hotpot.png', import.meta.url).href,
  malatang: new URL('./assets/foods/malatang.png', import.meta.url).href,
  bbq: new URL('./assets/foods/bbq.png', import.meta.url).href,
  sushi: new URL('./assets/foods/sushi.png', import.meta.url).href,
  korean: new URL('./assets/foods/korean.png', import.meta.url).href,
  noodles: new URL('./assets/foods/noodles.png', import.meta.url).href,
  salad: new URL('./assets/foods/salad.png', import.meta.url).href,
  burger: new URL('./assets/foods/burger.png', import.meta.url).href,
  'home-style': new URL('./assets/foods/home-style.png', import.meta.url).href,
  thai: new URL('./assets/foods/thai.png', import.meta.url).href,
  congee: new URL('./assets/foods/congee.png', import.meta.url).href,
  pizza: new URL('./assets/foods/pizza.png', import.meta.url).href,
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
  'hainanese-chicken-rice': new URL('./assets/foods/hainanese-chicken-rice.png', import.meta.url).href,
  'laksa-noodles': new URL('./assets/foods/laksa-noodles.png', import.meta.url).href,
  'meatball-pasta': new URL('./assets/foods/meatball-pasta.png', import.meta.url).href,
  'katsu-curry-rice': new URL('./assets/foods/katsu-curry-rice.png', import.meta.url).href,
  'braised-pork-rice': new URL('./assets/foods/braised-pork-rice.png', import.meta.url).href,
  'dim-sum-basket': new URL('./assets/foods/dim-sum-basket.png', import.meta.url).href,
  'army-stew': new URL('./assets/foods/army-stew.png', import.meta.url).href,
  'moroccan-tagine': new URL('./assets/foods/moroccan-tagine.png', import.meta.url).href,
  'poke-bowl': new URL('./assets/foods/poke-bowl.png', import.meta.url).href,
  'wonton-soup': new URL('./assets/foods/wonton-soup.png', import.meta.url).href,
};

function hydrateDinnerOptions(options) {
  return options.map((option) => ({
    ...option,
    image: foodImages[option.image] ?? option.image,
  }));
}

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

function normalizeSelections(savedSelections) {
  return Object.keys(defaultSelections).reduce((nextSelections, key) => {
    nextSelections[key] =
      typeof savedSelections?.[key] === 'string' ? savedSelections[key] : defaultSelections[key];
    return nextSelections;
  }, {});
}

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
  'hainanese-chicken-rice',
  'laksa-noodles',
  'meatball-pasta',
  'katsu-curry-rice',
  'braised-pork-rice',
  'dim-sum-basket',
  'army-stew',
  'moroccan-tagine',
  'poke-bowl',
  'wonton-soup',
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

function getRecommendations(options, selections, shuffleSeed) {
  if (!options.length) return [];

  const activeCount = Object.values(selections).filter(Boolean).length;
  const scoredOptions = options.map((option) => ({
    ...option,
    matchScore: getMatchScore(option, selections),
    noise: seededNoise(option.id, shuffleSeed),
  }));
  const maxMatchScore = Math.max(...scoredOptions.map((option) => option.matchScore));
  const ranked = [...options]
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
  const [dinnerOptions, setDinnerOptions] = useState([]);
  const [dataSource, setDataSource] = useState('loading');
  const [user, setUser] = useState(null);
  const [authPanelOpen, setAuthPanelOpen] = useState(false);
  const [authStep, setAuthStep] = useState('email');
  const [email, setEmail] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [authStatus, setAuthStatus] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [preferenceStatus, setPreferenceStatus] = useState('');
  const [preferenceBusy, setPreferenceBusy] = useState(false);
  const recommendations = useMemo(
    () => getRecommendations(dinnerOptions, selections, shuffleSeed),
    [dinnerOptions, selections, shuffleSeed],
  );

  const activeCount = Object.values(selections).filter(Boolean).length;

  useEffect(() => {
    let isMounted = true;

    loadDinnerOptions().then(({ options, source }) => {
      if (!isMounted) return;
      setDinnerOptions(hydrateDinnerOptions(options));
      setDataSource(source);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    getCurrentUser().then((currentUser) => {
      if (!isMounted) return;
      setUser(currentUser);
    });

    const unsubscribe = listenToAuthChanges((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setAuthPanelOpen(false);
        setLoginCode('');
        setAuthStep('email');
        setAuthStatus('');
      } else {
        setPreferenceStatus('');
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    setPreferenceStatus('正在读取你的偏好...');

    loadUserPreferences(user.id)
      .then((savedSelections) => {
        if (!isMounted) return;

        if (savedSelections) {
          setSelections(normalizeSelections(savedSelections));
          setPreferenceStatus('已恢复你上次保存的偏好。');
        } else {
          setPreferenceStatus('登录成功，当前还没有保存过偏好。');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setPreferenceStatus('偏好读取失败，先用当前选择也可以。');
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

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

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setAuthStatus('先输入邮箱，我再给你发验证码。');
      return;
    }

    setAuthBusy(true);
    setAuthStatus('正在发送验证码...');

    try {
      await sendLoginCode(trimmedEmail);
      setEmail(trimmedEmail);
      setAuthStep('code');
      setLoginCode('');
      setAuthStatus('验证码已发送，去邮箱查看 6 位数字。');
    } catch (error) {
      setAuthStatus(error.message || '发送失败，稍后再试一次。');
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleCodeSubmit(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedCode = loginCode.trim();

    if (!trimmedCode) {
      setAuthStatus('请输入邮箱里的 6 位验证码。');
      return;
    }

    setAuthBusy(true);
    setAuthStatus('正在验证...');

    try {
      const verifiedUser = await verifyLoginCode(trimmedEmail, trimmedCode);
      setUser(verifiedUser);
      setAuthPanelOpen(false);
      setLoginCode('');
      setAuthStep('email');
      setAuthStatus('');
    } catch (error) {
      setAuthStatus(error.message || '验证码不对或已过期，请重新输入。');
    } finally {
      setAuthBusy(false);
    }
  }

  function closeAuthPanel() {
    setAuthPanelOpen(false);
    setLoginCode('');
    setAuthStatus('');
  }

  function changeLoginEmail() {
    setAuthStep('email');
    setLoginCode('');
    setAuthStatus('');
  }

  async function handleSignOut() {
    setAuthBusy(true);
    setAuthStatus('');

    try {
      await signOut();
      setUser(null);
      setPreferenceStatus('');
    } catch (error) {
      setAuthStatus(error.message || '退出失败，稍后再试一次。');
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleSavePreferences() {
    if (!user) {
      setAuthPanelOpen(true);
      setPreferenceStatus('登录后就能保存偏好。');
      return;
    }

    setPreferenceBusy(true);
    setPreferenceStatus('正在保存你的偏好...');

    try {
      await saveUserPreferences(user.id, selections);
      setPreferenceStatus('已保存，下次登录会自动恢复。');
    } catch (error) {
      setPreferenceStatus(error.message || '保存失败，稍后再试一次。');
    } finally {
      setPreferenceBusy(false);
    }
  }

  return (
    <main className="app-shell">
      <div className="auth-bar" aria-label="账户状态">
        {user ? (
          <>
            <span className="auth-email">{user.email}</span>
            <button className="auth-button" type="button" onClick={handleSignOut} disabled={authBusy}>
              <LogOut size={16} />
              退出
            </button>
          </>
        ) : (
          <button
            className="auth-button"
            type="button"
            onClick={() => setAuthPanelOpen(true)}
            disabled={!isSupabaseConfigured}
            title={isSupabaseConfigured ? '登录后可以保存偏好' : '配置 Supabase 后可登录'}
          >
            <LogIn size={16} />
            {isSupabaseConfigured ? '登录' : '登录未配置'}
          </button>
        )}
      </div>

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

          <div className="preference-actions">
            <button
              className="save-button"
              type="button"
              onClick={handleSavePreferences}
              disabled={preferenceBusy || !isSupabaseConfigured}
            >
              <Save size={17} />
              {preferenceBusy ? '保存中' : '保存偏好'}
            </button>
            <p>
              {preferenceStatus ||
                (!isSupabaseConfigured
                  ? '配置 Supabase 后可以登录并保存偏好。'
                  : user
                    ? '保存后下次登录会自动带回这些选择。'
                    : '登录后可以保存你的常用口味。')}
            </p>
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
            {dataSource === 'loading'
              ? '正在加载晚餐数据'
              : activeCount
                ? `已根据 ${activeCount} 个偏好推荐`
                : '未选择也可以，先给你默认灵感'}
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

      {authPanelOpen && (
        <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
          <div className="auth-card">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">ACCOUNT</p>
                <h2 id="auth-title">邮箱登录</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={closeAuthPanel}
                aria-label="关闭登录窗口"
              >
                <X size={18} />
              </button>
            </div>

            {authStep === 'email' ? (
              <form className="auth-form" onSubmit={handleLoginSubmit}>
                <label htmlFor="login-email">邮箱</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                <button className="reroll-button" type="submit" disabled={authBusy}>
                  <LogIn size={17} />
                  {authBusy ? '发送中' : '发送验证码'}
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleCodeSubmit}>
                <div className="code-summary">
                  <span>验证码已发送至</span>
                  <strong>{email}</strong>
                </div>
                <label htmlFor="login-code">6 位验证码</label>
                <input
                  className="code-input"
                  id="login-code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={loginCode}
                  onChange={(event) => setLoginCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  autoComplete="one-time-code"
                />
                <button className="reroll-button" type="submit" disabled={authBusy}>
                  <LogIn size={17} />
                  {authBusy ? '验证中' : '确认登录'}
                </button>
                <div className="auth-secondary-actions">
                  <button type="button" onClick={handleLoginSubmit} disabled={authBusy}>
                    重新发送
                  </button>
                  <button type="button" onClick={changeLoginEmail} disabled={authBusy}>
                    换邮箱
                  </button>
                </div>
              </form>
            )}

            <p className="auth-hint">不用密码。输入邮箱里的 6 位验证码，就能保存你的晚餐偏好。</p>
            {authStatus && <p className="form-status">{authStatus}</p>}
            {!isSupabaseConfigured && <p className="form-status">当前还没配置 Supabase，登录暂不可用。</p>}
          </div>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
