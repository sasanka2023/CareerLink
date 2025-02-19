import React from "react";

const UserReviews = ({ reviews, onPrev, onNext, currentIndex, reviewsPerPage }) => {
    const currentReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage);

    return (
        <div className="user-reviews-section">
            <div className="reviews-carousel">
                <button
                    className="arrow-button"
                    onClick={onPrev}
                    disabled={currentIndex === 0}
                >
                    &#8249;
                </button>
                <div className="reviews-container">
                    {currentReviews.map((review, index) => (
                        <div className="review-card" key={index}>
                            <div className="reviewer-name-rating">
                                <p className="reviewer-name">{review.reviewer}</p>
                                <p className="review-rating">{"⭐".repeat(review.rating)}</p>
                            </div>
                            <p className="review-text">{review.review}</p>
                        </div>
                    ))}
                </div>
                <button
                    className="arrow-button"
                    onClick={onNext}
                    disabled={currentIndex + reviewsPerPage >= reviews.length}
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
};

export default UserReviews;
