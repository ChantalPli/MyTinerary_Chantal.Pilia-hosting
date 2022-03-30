import "./styles/HeroImage.css";

export default function HeroImage(props) {
    return (
        <section className="hero-image" style={{ backgroundImage: `url(${props.image})` }}>
            {props.children}
        </section>
    );
}
