export interface MockReview {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  reviewDate: string;
  responded: boolean;
  platform: string;
  aiSuggestedReply?: string;
  actualReply?: string;
}

export const mockReviews: MockReview[] = [
  {
    id: "review-1",
    authorName: "Sarah M.",
    rating: 5,
    text: "Finally a place that actually listens! Been looking for somewhere like this for months. Lisa at the front was super helpful",
    reviewDate: "2024-01-10",
    responded: false,
    platform: "Google",
  },
  {
    id: "review-2",
    authorName: "Mike Johnson",
    rating: 4,
    text: "Good but had to wait like 20 min past my appointment time. The actual service was solid tho, guy knew what he was doing",
    reviewDate: "2024-01-09",
    responded: false,
    platform: "Google",
  },
  {
    id: "review-3",
    authorName: "Emily R.",
    rating: 2,
    text: "idk what happened but this was not the same experience my friend had. Felt rushed the whole time and nobody really explained anything. Maybe just a bad day?",
    reviewDate: "2024-01-08",
    responded: false,
    platform: "Google",
  },
  {
    id: "review-4",
    authorName: "David Chen",
    rating: 5,
    text: "10/10 would recommend. Quick, professional, fair price. What more do you need",
    reviewDate: "2024-01-07",
    responded: true,
    platform: "Google",
    actualReply: "Thanks David! Appreciate you taking the time to leave a review. See you next time.",
  },
  {
    id: "review-5",
    authorName: "Jessica Wong",
    rating: 3,
    text: "It was fine. Got what I needed done. Nothing bad nothing great",
    reviewDate: "2024-01-06",
    responded: false,
    platform: "Google",
  },
  {
    id: "review-6",
    authorName: "Robert Taylor",
    rating: 1,
    text: "Waited 45 MINUTES. Then when I finally got seen they messed up my order and acted like it was my fault?? Never again. Save yourself the headache and go somewhere else",
    reviewDate: "2024-01-05",
    responded: false,
    platform: "Google",
  },
  {
    id: "review-7",
    authorName: "Amanda Lewis",
    rating: 5,
    text: "My go-to spot now. Third time coming here and they remember my name which is a nice touch. Parking can be tricky on weekends fyi",
    reviewDate: "2024-01-04",
    responded: true,
    platform: "Google",
    actualReply: "Hey Amanda! Yeah the parking situation isn't ideal - we're actually looking into options for that. Thanks for sticking with us!",
  },
  {
    id: "review-8",
    authorName: "Chris Brown",
    rating: 4,
    text: "Solid experience. A bit pricier than competitors but you get what you pay for I guess",
    reviewDate: "2024-01-03",
    responded: false,
    platform: "Google",
  },
];

export const mockBusinessStats = {
  averageRating: 3.6,
  totalReviews: 8,
  pendingResponses: 5,
  replyRate: 37.5,
};
