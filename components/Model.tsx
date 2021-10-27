import style from '@style/Model.module.scss';
import Link from 'next/link';
interface ModelProps {
    name: string;
    features: string[];
}
export default function Model({ name, features }: ModelProps) {
    return (
        <Link href={'/from-files/' + name}>
            <div className={style.model}>
                <h2>{name}</h2>
                {features.map((f) => (
                    <p key={f}>{f}</p>
                ))}
            </div>
        </Link>
    );
}