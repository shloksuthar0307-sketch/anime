const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

interface AIRecommendation {
  title: string;
  mal_id: number;
  reason: string;
  emotional_tag: string;
  hidden_gem: boolean;
  match_score: number;
}

interface AIInput {
  mood: string;
  favorites: string[];
  genres: string[];
  description: string;
}

const buildPrompt = ({ mood, favorites, genres, description }: AIInput) => `
  Recommend 6 anime for this user:
  - Mood: ${mood}
  - Favorites: ${favorites.join(', ')}
  - Preferred genres: ${genres.join(', ')}
  - Extra context: "${description}"

  Return a JSON array where each object has:
  { "title": string, "mal_id": number, "reason": string, "emotional_tag": string, "hidden_gem": boolean, "match_score": number }
  Return ONLY the JSON array, no markdown or extra text.
`;

export const getAIRecommendations = async (userInput: AIInput): Promise<AIRecommendation[]> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    return getFallbackRecommendations(userInput);
  }

  try {
    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 1200,
        messages: [
          {
            role: 'system',
            content: 'You are ARU — an anime recommendation AI. You know every anime from 1960-2025. Respond ONLY with a valid JSON array. No markdown. No extra text.',
          },
          { role: 'user', content: buildPrompt(userInput) },
        ],
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '[]';
    return JSON.parse(content);
  } catch {
    return getFallbackRecommendations(userInput);
  }
};

const getFallbackRecommendations = (input: AIInput): AIRecommendation[] => {
  const fallbacks: Record<string, AIRecommendation[]> = {
    happy: [
      { title: 'K-On!', mal_id: 5680, reason: 'Pure joy and friendship in a music club', emotional_tag: 'Uplifting', hidden_gem: false, match_score: 92 },
      { title: 'Nichijou', mal_id: 10165, reason: 'Absurd comedy that never stops being funny', emotional_tag: 'Hilarious', hidden_gem: true, match_score: 88 },
      { title: 'Barakamon', mal_id: 22789, reason: 'Heartwarming calligraphy journey on a rural island', emotional_tag: 'Wholesome', hidden_gem: false, match_score: 90 },
      { title: 'Gintama', mal_id: 28977, reason: 'The king of comedy anime with heart', emotional_tag: 'Entertaining', hidden_gem: false, match_score: 95 },
      { title: 'Saiki K', mal_id: 33486, reason: 'Deadpan psychic comedy at its finest', emotional_tag: 'Witty', hidden_gem: true, match_score: 85 },
      { title: 'Daily Lives of High School Boys', mal_id: 11843, reason: 'Relatable and ridiculous school comedy', emotional_tag: 'Silly', hidden_gem: true, match_score: 82 },
    ],
    sad: [
      { title: 'Your Lie in April', mal_id: 23273, reason: 'A devastatingly beautiful story of loss and music', emotional_tag: 'Heartbreaking', hidden_gem: false, match_score: 94 },
      { title: 'Clannad: After Story', mal_id: 4181, reason: 'The anime that will make you cry the most', emotional_tag: 'Devastating', hidden_gem: false, match_score: 97 },
      { title: 'Anohana', mal_id: 9989, reason: 'A group of friends processing grief together', emotional_tag: 'Tearful', hidden_gem: false, match_score: 90 },
      { title: 'Violet Evergarden', mal_id: 33352, reason: 'Stunning animation meets emotional storytelling', emotional_tag: 'Bittersweet', hidden_gem: false, match_score: 92 },
      { title: 'Grave of the Fireflies', mal_id: 578, reason: 'The most emotionally devastating anime film ever made', emotional_tag: 'Tragic', hidden_gem: false, match_score: 96 },
      { title: 'Angel Beats', mal_id: 6547, reason: 'Afterlife drama with unexpected emotional depth', emotional_tag: 'Moving', hidden_gem: true, match_score: 86 },
    ],
    motivated: [
      { title: 'Haikyuu!!', mal_id: 20583, reason: 'The most inspiring sports anime ever made', emotional_tag: 'Inspiring', hidden_gem: false, match_score: 95 },
      { title: 'My Hero Academia', mal_id: 31964, reason: 'Anyone can be a hero — pure motivation', emotional_tag: 'Empowering', hidden_gem: false, match_score: 90 },
      { title: 'Dr. Stone', mal_id: 38691, reason: 'Science and determination rebuild civilization', emotional_tag: 'Thrilling', hidden_gem: false, match_score: 88 },
      { title: 'Mob Psycho 100', mal_id: 32182, reason: 'Self-improvement wrapped in psychic battles', emotional_tag: 'Uplifting', hidden_gem: false, match_score: 92 },
      { title: 'Hajime no Ippo', mal_id: 263, reason: 'Boxing underdog story that never quits', emotional_tag: 'Fierce', hidden_gem: true, match_score: 91 },
      { title: 'Silver Spoon', mal_id: 16989, reason: 'Finding purpose in unexpected places', emotional_tag: 'Grounding', hidden_gem: true, match_score: 84 },
    ],
    romantic: [
      { title: 'Toradora!', mal_id: 4224, reason: 'The gold standard of romantic comedy anime', emotional_tag: 'Warm', hidden_gem: false, match_score: 94 },
      { title: 'Kaguya-sama: Love is War', mal_id: 37999, reason: 'Brilliant battle of wits disguised as romance', emotional_tag: 'Delightful', hidden_gem: false, match_score: 96 },
      { title: 'Horimiya', mal_id: 42897, reason: 'Refreshing honest relationship from the start', emotional_tag: 'Tender', hidden_gem: false, match_score: 91 },
      { title: 'Fruits Basket (2019)', mal_id: 38680, reason: 'Deep emotional romance with found family', emotional_tag: 'Healing', hidden_gem: false, match_score: 93 },
      { title: 'Tsuki ga Kirei', mal_id: 34822, reason: 'The most realistic middle school romance', emotional_tag: 'Gentle', hidden_gem: true, match_score: 87 },
      { title: 'Bloom Into You', mal_id: 37787, reason: 'Beautiful yuri romance with depth', emotional_tag: 'Intimate', hidden_gem: true, match_score: 89 },
    ],
    dark: [
      { title: 'Death Note', mal_id: 1535, reason: 'The psychological thriller that defined a generation', emotional_tag: 'Intense', hidden_gem: false, match_score: 97 },
      { title: 'Monster', mal_id: 19, reason: 'A masterclass in psychological horror', emotional_tag: 'Chilling', hidden_gem: true, match_score: 94 },
      { title: 'Psycho-Pass', mal_id: 13601, reason: 'Dystopian society questioning justice itself', emotional_tag: 'Unsettling', hidden_gem: false, match_score: 90 },
      { title: 'Paranoia Agent', mal_id: 323, reason: 'Satoshi Kon\'s descent into collective madness', emotional_tag: 'Disturbing', hidden_gem: true, match_score: 88 },
      { title: 'Made in Abyss', mal_id: 34599, reason: 'Deceptively cute exterior hiding true darkness', emotional_tag: 'Harrowing', hidden_gem: false, match_score: 92 },
      { title: 'Devilman Crybaby', mal_id: 35120, reason: 'Visceral horror with philosophical depth', emotional_tag: 'Shocking', hidden_gem: false, match_score: 89 },
    ],
    lonely: [
      { title: 'March Comes in Like a Lion', mal_id: 31646, reason: 'A beautiful portrait of depression and healing', emotional_tag: 'Contemplative', hidden_gem: false, match_score: 95 },
      { title: 'Natsume\'s Book of Friends', mal_id: 5190, reason: 'Gentle stories of connection and isolation', emotional_tag: 'Soothing', hidden_gem: false, match_score: 91 },
      { title: 'Mushishi', mal_id: 457, reason: 'Meditative journeys through a mystical world', emotional_tag: 'Tranquil', hidden_gem: false, match_score: 93 },
      { title: 'Welcome to the NHK', mal_id: 202, reason: 'Raw portrayal of social isolation and recovery', emotional_tag: 'Raw', hidden_gem: true, match_score: 88 },
      { title: 'Aria the Animation', mal_id: 477, reason: 'The most calming anime experience possible', emotional_tag: 'Peaceful', hidden_gem: true, match_score: 90 },
      { title: 'Laid-Back Camp', mal_id: 34798, reason: 'Solo camping as a form of self-care', emotional_tag: 'Relaxing', hidden_gem: false, match_score: 86 },
    ],
    chill: [
      { title: 'Yuru Camp', mal_id: 34798, reason: 'Peak relaxation with beautiful scenery', emotional_tag: 'Peaceful', hidden_gem: false, match_score: 93 },
      { title: 'Aria the Animation', mal_id: 477, reason: 'The ultimate iyashikei healing anime', emotional_tag: 'Serene', hidden_gem: true, match_score: 91 },
      { title: 'Flying Witch', mal_id: 31376, reason: 'Gentle magical everyday life', emotional_tag: 'Cozy', hidden_gem: true, match_score: 87 },
      { title: 'Non Non Biyori', mal_id: 17549, reason: 'Countryside slice of life perfection', emotional_tag: 'Wholesome', hidden_gem: false, match_score: 89 },
      { title: 'Tamayura', mal_id: 9053, reason: 'Photography and healing in a seaside town', emotional_tag: 'Gentle', hidden_gem: true, match_score: 85 },
      { title: 'Sketchbook: Full Color\'s', mal_id: 2946, reason: 'Quiet art club observations', emotional_tag: 'Calm', hidden_gem: true, match_score: 82 },
    ],
    excited: [
      { title: 'Attack on Titan', mal_id: 16498, reason: 'Non-stop adrenaline and mind-blowing reveals', emotional_tag: 'Thrilling', hidden_gem: false, match_score: 97 },
      { title: 'Demon Slayer', mal_id: 38000, reason: 'Breathtaking animation meets intense action', emotional_tag: 'Electrifying', hidden_gem: false, match_score: 94 },
      { title: 'Jujutsu Kaisen', mal_id: 40748, reason: 'Modern shounen at its absolute peak', emotional_tag: 'Intense', hidden_gem: false, match_score: 93 },
      { title: 'Cyberpunk: Edgerunners', mal_id: 52301, reason: 'Visually explosive and emotionally devastating', emotional_tag: 'Wild', hidden_gem: false, match_score: 91 },
      { title: 'Mob Psycho 100', mal_id: 32182, reason: 'When emotions explode so does everything else', emotional_tag: 'Explosive', hidden_gem: false, match_score: 92 },
      { title: 'Promare', mal_id: 35848, reason: 'Studio Trigger at their most unhinged', emotional_tag: 'Fiery', hidden_gem: true, match_score: 88 },
    ],
    emotional: [
      { title: 'Steins;Gate', mal_id: 9253, reason: 'Time travel with devastating emotional weight', emotional_tag: 'Profound', hidden_gem: false, match_score: 97 },
      { title: 'A Silent Voice', mal_id: 28851, reason: 'Redemption and empathy in its purest form', emotional_tag: 'Moving', hidden_gem: false, match_score: 95 },
      { title: 'Fruits Basket (2019)', mal_id: 38680, reason: 'Emotional healing through found family', emotional_tag: 'Healing', hidden_gem: false, match_score: 93 },
      { title: 'March Comes in Like a Lion', mal_id: 31646, reason: 'Depression and recovery rendered beautifully', emotional_tag: 'Deep', hidden_gem: false, match_score: 94 },
      { title: 'Banana Fish', mal_id: 36655, reason: 'Gripping crime drama with deep emotional bonds', emotional_tag: 'Intense', hidden_gem: true, match_score: 89 },
      { title: 'Given', mal_id: 39633, reason: 'Music and grief intertwined beautifully', emotional_tag: 'Bittersweet', hidden_gem: true, match_score: 87 },
    ],
  };

  return fallbacks[input.mood] || fallbacks.happy;
};
