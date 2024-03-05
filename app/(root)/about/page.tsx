import Image from "next/image"

const AboutUsPage = () => {
  return (
    <section className="wrapper flex flex-col gap-12 lg:gap-32 items-center justify-center lg:justify-between py-5 lg:py-10">
        <div className="flex justify-center items-center gap-12">
            <div className="flex flex-col gap-2">
                <h3 className='h3-bold text-center lg:text-left py-3'>Our Story</h3>
                <p>
                    Culinary Cove was born out of a love for food, family, and the desire to create a shared space for culinary adventures. It all started with a kitchen filled with laughter, the clinking of utensils, and the delightful aroma of Grandma's famous lasagna recipe wafting through the air.
                    <br/><br/>
                    As our family gathered around the table, we realized the magic of sharing recipes and stories, passing down traditions from one generation to the next. But keeping track of all those beloved recipes scattered across cookbooks, websites, and handwritten notes was a challenge.
                    <br/><br/>
                    That's when the idea for Culinary Cove sprang to life – a digital haven where we could preserve our culinary treasures, explore new flavors, and connect with each other through the joy of cooking.
                </p>
            </div>
            <Image
                src="/assets/images/about-us.svg"
                layout="responsive"
                width={500}
                height={700}
                alt="people cooking"
                className="hidden lg:block max-h-[700px]"
            />
        </div>
        <div className="flex justify-center items-center gap-12">
            <Image
                src="/assets/images/mission.svg"
                width={500}
                height={700}
                alt="reading book"
                className="hidden lg:block max-h-[700px]"
            />
            <div className="flex flex-col gap-2">
                <h3 className='h3-bold text-center lg:text-left py-3'>Our Mission</h3>
                <p>
                    At Culinary Cove, our mission is simple: to bring families closer together through the art of cooking. We believe that every meal is an opportunity to create cherished memories, share stories, and celebrate the love that binds us.
                    <br/><br/>
                    With our Recipe Book Builder, we aim to empower home cooks of all skill levels to curate their own culinary journey. Whether you're a seasoned chef or just dipping your toes into the world of cooking, Culinary Cove is your trusty companion on the path to delicious discoveries.
                </p>
            </div>
        </div>
        <div className="flex justify-center items-center gap-12 mb-12">
            <div className="flex flex-col gap-2">
                <h3 className='h3-bold text-center lg:text-left py-3'>Join Us!</h3>
                <p>
                    So come on in, grab a whisk, and let's embark on a mouthwatering adventure together! Join our Culinary Cove community, where every recipe tells a story, and every dish is made with love.
                    <br/><br/>
                    Let's turn the page to a new chapter of culinary delight – because here at Culinary Cove, the kitchen is always open, and the table is set for you. 🍽️💕
                </p>
            </div>
            <Image
                src="/assets/images/join.svg"
                width={500}
                height={700}
                alt="sharing information"
                className="hidden lg:block max-h-[700px]"
            />
        </div>
    </section>
  )
}

export default AboutUsPage