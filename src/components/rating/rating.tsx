import { RatingProps } from './rating.props';

function Rating({ rating, setRating }: RatingProps) {
  return (
    <div className="rating">
      <div className="rating__stars">
        {Array.from({ length: 10 }, (_, i) => i + 1)
          .reverse()
          .map((number) => (
            <>
              <input
                className="rating__input"
                id={`star-${number}`}
                type="radio"
                name="rating"
                value={number}
                onChange={setRating}
                checked={`${number}` === rating}
              />
              <label
                className="rating__label"
                htmlFor={`star-${number}`}
              >
                Rating {number}
              </label>
            </>
          ))}
      </div>
    </div>

  );
}

export default Rating;
