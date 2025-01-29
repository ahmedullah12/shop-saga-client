import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { bannerCarouselData } from "@/utils/constants";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="container px-0 py-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="relative mx-auto"
      >
        <CarouselContent className="min-h-[28rem] md:h-[32rem]">
          {bannerCarouselData.map((data, index) => (
            <CarouselItem key={index}>
              <Card className="h-full border-0 shadow-none overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
                <CardContent className="flex h-full items-center justify-center p-0">
                  <div className="relative w-full h-full px-4 md:px-8 lg:px-12">
                    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                      <div className="flex flex-col justify-center space-y-4 md:space-y-8 text-center md:text-left relative py-4 md:py-0">
                        <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-12 -translate-y-12" />
                        <span className="text-primary/80 font-medium tracking-wider uppercase text-sm">
                          Featured Collection
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight">
                          {data.header}
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 font-light leading-relaxed max-w-xl">
                          {data.desc}
                        </p>
                        <div className="pt-2 md:pt-4">
                          <Link to="/products">
                            <Button className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 rounded-full">
                              Shop Now
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="flex justify-center items-center relative h-48 md:h-full">
                        <div className="absolute w-48 md:w-96 h-48 md:h-96 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full opacity-60 blur-3xl animate-pulse"></div>
                        <img
                          className="relative w-auto h-full md:h-auto md:max-w-[85%] object-contain transform transition-all duration-500 hover:scale-105 drop-shadow-xl"
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
      </Carousel>
    </div>
  );
}