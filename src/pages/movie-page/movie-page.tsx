import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { AppRoute } from '../../const';
import FilmsList from '../../components/film-list/film-list';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Tabs from '../../components/tabs/tabs';
import { fetchFilm } from '../../store/api-action';
import { useEffect } from 'react';
import Loading from '../../components/loading/loading';
import { NotFoundPage } from '../../components/app/all-pages';
import { FilmInListType, FilmType } from '../../schemas/films';
import { getErrorFilm, getFilm, getSimilarFilms } from '../../store/films/selectors';
import MyListButton from '../../components/my-list-btn/my-list-btn';

function MoviePage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const film = useAppSelector(getFilm) as FilmType;
  const films = useAppSelector(getSimilarFilms) as FilmInListType[];
  const error = useAppSelector(getErrorFilm) as boolean;

  useEffect(() => {
    dispatch(fetchFilm(id as string));
  }, [dispatch, id]);

  if (error) {
    return <NotFoundPage />;
  }
  if (film === null) {
    return <Loading />;
  }
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link to={`${AppRoute.Player}/${film.id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Link>
                <MyListButton film={film} />
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width={218} height={327} />
            </div>
            <Tabs />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={films} />
        </section>
        <Footer />
      </div>
    </>

  );
}

export default MoviePage;
