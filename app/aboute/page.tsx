export default async function Aboute() {
    return (

        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 mt-20">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
                    Our online fashion store, also known as an e-commerce fashion retailer, is a digital
                     platform that offers a vast array of clothing, accessories, and footwear for shoppers 
                     to explore and purchase from the convenience of their devices. Our virtual boutiques
                      provide a wide selection of trendy and stylish products, catering to diverse tastes and 
                      preferences, enabling customers to effortlessly keep up with the latest fashion trends 
                      and express their unique sense of style. With user-friendly interfaces, personalized 
                      recommendations, and seamless checkout processes, online fashion stores create a seamless 
                      shopping journey for users, making
                     it a preferred choice for modern consumers seeking a hassle-free and enjoyable shopping experience.
                    </p>
                </div>
                <div className="w-full lg:w-8/12">
                    <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
                </div>
            </div>
    
            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">Our Staff</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
                   <b> Alexa ,</b>web developer is responsible for the designing and developing of the online fashion store's
                     website. 
                     <hr />
                   <b>Olivia,</b> is our customers service representative that  handle inquiries, provide assistance with orders, resolve any issues or complaints, 
                   and ensure that customers have a positive shopping experience.
                   <hr />
                   <b>Liam and Elijah</b> are both our social media managers. 
                    </p>
                </div>
                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Image" />
                            <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Image" />
                            <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">Alexa</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Image" />
                            <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Image" />
                            <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">Olivia</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Image" />
                            <img className="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Image" />
                            <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">Liam</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured image" />
                            <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured image" />
                            <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">Elijah</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        )

}