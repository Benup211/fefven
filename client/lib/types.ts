export interface CarouselItem {
    id: number
    title: string
    description: string
    imageUrl: string
    createdAt: string
    updatedAt: string
  }
  
  export interface NewCarouselItem {
    title: string
    description: string
    file: File | null
  }

  export interface IErrorResponse {
    status: number;
    errorName: string;
    errorMessage: string;
}