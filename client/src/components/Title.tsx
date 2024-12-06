interface TitleProps {
  title: string;
}
const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <h1 className="text-center text-4xl text-secondary font-semibold">
      {title}
    </h1>
  );
};

export default Title;
