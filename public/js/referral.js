$(document).ready(function(){

    const reviews = [
        {
            stars: 5,
            title: "fast and efficient",
            text: "On deck was really great and giving me the funds that I needed they even approved me",
            author: "Sunny",
            date: "August 28",
        },
        {
            stars: 4,
            title: "Great Experience with John",
            text: "Worked with Jon D'Amico. Great experience. Simple and hassle free.",
            author: "Jason Simmons",
            date: "August 27",
        },
        {
            stars: 4,
            title: "Quick and easy",
            text: "Quick and easy! Keeping small businesses ready for the next projects",
            author: "POSOL",
            date: "August 24",
        },
        {
            stars: 4,
            title: "Professionalism and simply process",
            text: "Professionalism and simply process",
            author: "Michael",
            date: "August 23",
        },
        {
            stars: 5,
            title: "Justin Freidman is amazing",
            text: "Justin Freidman is amazing 10/10",
            author: "G TC",
            date: "August 24",
        },
        {
            stars: 4,
            title: "Professionalism and simply process",
            text: "Professionalism and simply process",
            author: "Michael",
            date: "August 23",
        },
    ];

    const rating = reviews.reduce((acc, item) => acc + item.stars, 0)/reviews.length;

    $(".rating-value").text(rating.toFixed(1));

    const reviewsData = reviews.reduce((acc, review) => {
        return acc + `
            <div class="reviews-item" data-stars="${review.stars}" itemscope itemtype="https://schema.org/Review">
                <div class="reviews-item-content" itemprop="itemReviewed" itemscope itemtype="https://schema.org/Organization">
                    <span itemprop="name" class="d-none">Fundshop</span>
                    <div class="reviews-title">${review.title}</div>
                    <p class="reviews-sub-title">${review.text}</p>
                    <div class="reviews-author" itemprop="author" itemscope itemtype="https://schema.org/Person">
                        <span itemprop="name">${review.author}</span>, 
                        <span class="reviews-date">${review.date}</span>
                    </div>
                </div>                            
            </div>
        `
    }, "");

    $(".reviews-content").html(reviewsData);

    $('.reviews-content').slick({
        dots: false,
        slidesToShow: 5,
        arrows:true,
        prevArrow: `<svg class="slick-custom-left-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g opacity="0.5">
          <path d="M12 23.5C18.3513 23.5 23.5 18.3513 23.5 12C23.5 5.64873 18.3513 0.5 12 0.5C5.64873 0.5 0.5 5.64873 0.5 12C0.5 18.3513 5.64873 23.5 12 23.5Z" stroke="#8C8C8C"/>
          <path d="M10.5089 12L13.8169 8.97549C14.061 8.75233 14.061 8.39052 13.8169 8.16737C13.5729 7.94421 13.1771 7.94421 12.9331 8.16737L9.18306 11.5959C8.93898 11.8191 8.93898 12.1809 9.18306 12.4041L12.9331 15.8326C13.1771 16.0558 13.5729 16.0558 13.8169 15.8326C14.061 15.6095 14.061 15.2477 13.8169 15.0245L10.5089 12Z" fill="#8C8C8C" stroke="#232323"/>
        </g>
      </svg>`,
        nextArrow: `<svg class="slick-custom-right-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g opacity="0.5">
          <path d="M12 0.5C5.64873 0.5 0.5 5.64873 0.5 12C0.5 18.3513 5.64873 23.5 12 23.5C18.3513 23.5 23.5 18.3513 23.5 12C23.5 5.64873 18.3513 0.5 12 0.5Z" stroke="#8C8C8C"/>
          <path d="M13.4911 12L10.1831 15.0245C9.93898 15.2477 9.93898 15.6095 10.1831 15.8326C10.4271 16.0558 10.8229 16.0558 11.0669 15.8326L14.8169 12.4041C15.061 12.1809 15.061 11.8191 14.8169 11.5959L11.0669 8.16737C10.8229 7.94421 10.4271 7.94421 10.1831 8.16737C9.93898 8.39053 9.93898 8.75233 10.1831 8.97549L13.4911 12Z" fill="#8C8C8C" stroke="#232323"/>
        </g>
      </svg>`,
        autoplay: true,
        autoplaySpeed: 2000,

        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              }
            },
            {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
            }
        ]
    });
});