type CardProps = {
    onClick: () => void;
};

const Card = ({ onClick }: CardProps) => {
    return (
        <div className="card" onClick={onClick}>
            <h2>Click here to open the form</h2>
        </div>
    );
};

export default Card;
