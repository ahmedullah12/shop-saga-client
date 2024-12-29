import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { bannerCarouselData } from "@/utils/constants";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

export default function Banner() {
  return (
    <div className="container px-4 py-8">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="relative mx-auto"
      >
        <CarouselContent className="h-[32rem]">
          {bannerCarouselData.map((data, index) => (
            <CarouselItem key={index}>
              <Card className="h-full border-0 shadow-none overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100">
                <CardContent className="flex h-full items-center justify-center p-0">
                  <div className="relative w-full h-full px-4 md:px-8 lg:px-12">
                    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                      <div className="flex flex-col justify-center space-y-4 md:space-y-6 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                          {data.header}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-xl">
                          {data.desc}
                        </p>
                        <div className="pt-2">
                          <Link to="/all-products">
                            <Button className="px-8 py-6 text-lg  hover:bg-gray-800 transition-all duration-300 rounded-md">
                              Shop Now
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="flex justify-center items-center relative">
                        <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-30 blur-3xl"></div>
                        <img
                          className="relative max-w-[80%] md:max-w-[90%] h-auto object-contain transform transition-transform duration-500 hover:scale-105"
                          src={data.image}
                          alt={data.header}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 left-8 md:-left-4 flex items-center">
          <CarouselPrevious className="bg-primary text-white h-12 w-12 opacity-70 hover:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="absolute inset-y-0 right-8 md:-right-4 flex items-center">
          <CarouselNext className="bg-primary text-white h-12 w-12 opacity-70 hover:opacity-100 transition-opacity duration-200" />
        </div>
      </Carousel>
    </div>
  );
}
