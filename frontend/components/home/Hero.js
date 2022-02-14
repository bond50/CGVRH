import BlogCarousel from "../blog/blog-carousel";

function ControlledCarousel({data}) {
    return (
        data.length > 0 && <section id='hero' className='hero-blog'>
            <BlogCarousel blogs={data} home/>
        </section>
    );
}

export default ControlledCarousel