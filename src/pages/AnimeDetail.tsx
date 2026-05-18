import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Play, Heart, Bookmark, Calendar, Tv, Users, ArrowLeft } from 'lucide-react';
import { useAnimeDetail, useAnimeCharacters } from '../hooks/useAnime';
import { useWatchlist } from '../hooks/useWatchlist';
import { formatEpisodes, stripHtml } from '../utils/formatters';
import GlassCard from '../components/ui/GlassCard';
import GenreBadge from '../components/ui/GenreBadge';
import NeonButton from '../components/ui/NeonButton';
import RatingBadge from '../components/ui/RatingBadge';
import PageWrapper from '../components/layout/PageWrapper';

export default function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const animeId = parseInt(id || '0');
  const { data: anime, isLoading } = useAnimeDetail(animeId);
  const { data: characters } = useAnimeCharacters(animeId);
  const { isInWatchlist, addToWatchlist, removeItem, toggleFavorite, items } = useWatchlist();
  const inList = isInWatchlist(animeId);
  const watchlistItem = items.find((i) => i.mal_id === animeId);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-void pt-8 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-[300px] skeleton rounded-card mb-8" />
            <div className="space-y-4">
              <div className="h-8 w-1/2 skeleton rounded" />
              <div className="h-4 w-3/4 skeleton rounded" />
              <div className="h-4 w-2/3 skeleton rounded" />
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!anime) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-void flex items-center justify-center">
          <div className="text-center">
            <p className="text-text-muted text-lg font-display">Anime not found</p>
            <button onClick={() => navigate('/explore')} className="mt-4 text-neon-cyan text-sm hover:underline">
              Back to Explore
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const synopsis = stripHtml(anime.synopsis || '');
  const imageUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;
  const trailerId = anime.trailer?.youtube_id;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-void pb-16">
        {anime.bannerImage && (
          <div className="relative h-[200px] sm:h-[300px] overflow-hidden">
            <img
              src={anime.bannerImage}
              alt=""
              className="w-full h-full object-cover blur-sm scale-110 opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void" />
          </div>
        )}

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-muted hover:text-neon-cyan transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-[180px] sm:w-[220px] rounded-card overflow-hidden shadow-xl shadow-void/50"
              >
                {imageUrl ? (
                  <img src={imageUrl} alt={anime.title} className="w-full aspect-[3/4] object-cover" />
                ) : (
                  <div className="w-full aspect-[3/4] bg-void-surface flex items-center justify-center">
                    <Tv className="w-8 h-8 text-text-muted" />
                  </div>
                )}
              </motion.div>
            </div>

            <div className="flex-1">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary mb-3">
                  {anime.title}
                </h1>
                {anime.title_japanese && (
                  <p className="font-accent text-text-muted text-sm mb-4">{anime.title_japanese}</p>
                )}

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {anime.score && <RatingBadge score={anime.score} size="lg" />}
                  {anime.rank && (
                    <span className="text-xs font-mono text-neon-gold bg-neon-gold/10 px-2 py-1 rounded-card">
                      #{anime.rank} Ranked
                    </span>
                  )}
                  <span className={`text-xs font-mono px-2 py-1 rounded-card ${
                    anime.status === 'Currently Airing' ? 'bg-green-500/10 text-green-400' :
                    anime.status === 'Finished Airing' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-glass-bg text-text-muted'
                  }`}>
                    {anime.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres?.map((g: any) => (
                    <GenreBadge key={g.mal_id} genre={g.name} />
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mb-6 text-sm text-text-secondary">
                  {anime.episodes && (
                    <span className="flex items-center gap-1.5">
                      <Tv className="w-4 h-4" /> {formatEpisodes(anime.episodes)} episodes
                    </span>
                  )}
                  {anime.duration && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {anime.duration}
                    </span>
                  )}
                  {anime.studios?.[0]?.name && (
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> {anime.studios[0].name}
                    </span>
                  )}
                  {anime.season && anime.year && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} {anime.year}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <NeonButton
                    variant={inList ? 'purple' : 'cyan'}
                    onClick={() => inList ? removeItem(animeId) : addToWatchlist({
                      mal_id: anime.mal_id,
                      title: anime.title,
                      image: imageUrl || '',
                      score: anime.score ?? null,
                      episodes: anime.episodes ?? null,
                    })}
                  >
                    <span className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4" />
                      {inList ? 'In Watchlist' : 'Add to Watchlist'}
                    </span>
                  </NeonButton>
                  {inList && (
                    <NeonButton
                      variant="pink"
                      onClick={() => toggleFavorite(animeId)}
                    >
                      <span className="flex items-center gap-2">
                        <Heart className={`w-4 h-4 ${watchlistItem?.isFavorite ? 'fill-current' : ''}`} />
                        {watchlistItem?.isFavorite ? 'Favorited' : 'Favorite'}
                      </span>
                    </NeonButton>
                  )}
                  {trailerId && (
                    <a
                      href={`https://youtube.com/watch?v=${trailerId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <NeonButton variant="gold">
                        <span className="flex items-center gap-2">
                          <Play className="w-4 h-4" /> Watch Trailer
                        </span>
                      </NeonButton>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {synopsis && (
            <GlassCard className="mb-8">
              <h2 className="font-display font-bold text-lg text-text-primary mb-3">Synopsis</h2>
              <p className="text-text-secondary text-sm leading-relaxed">{synopsis}</p>
            </GlassCard>
          )}

          {characters && characters.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display font-bold text-lg text-text-primary mb-4">Characters</h2>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {characters.slice(0, 12).map((char: any) => (
                  <div key={char.character?.mal_id} className="flex-shrink-0 w-[120px] text-center">
                    <div className="w-[120px] h-[120px] rounded-card overflow-hidden mb-2">
                      {char.character?.images?.jpg?.image_url ? (
                        <img
                          src={char.character.images.jpg.image_url}
                          alt={char.character.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-void-surface flex items-center justify-center">
                          <Users className="w-6 h-6 text-text-muted" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-text-primary font-semibold truncate">{char.character?.name}</p>
                    <p className="text-[10px] text-text-muted">{char.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {anime.relations?.length > 0 && (
            <GlassCard className="mb-8">
              <h2 className="font-display font-bold text-lg text-text-primary mb-4">Related</h2>
              <div className="space-y-2">
                {anime.relations.slice(0, 6).map((rel: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded-card">
                      {rel.relation}
                    </span>
                    <span className="text-text-secondary">{rel.entry?.[0]?.name || 'Unknown'}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
