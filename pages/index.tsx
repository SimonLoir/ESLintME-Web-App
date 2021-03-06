import Model from '@components/Model';
import type { NextPage } from 'next';
import style from '@style/Home.module.scss';

/**
 * Component representing the home page of the website.
 */
const Home: NextPage = () => {
    return (
        <>
            <div className={style.homeLayout}>
                <h1>Choose your model</h1>
                <div className={style.chooseModel}>
                    <Model
                        name='Google'
                        features={[
                            'Semicolon required',
                            'Trailing comma required',
                            'Template string preferred',
                            'No space before function call parenthesis',
                        ]}
                    />
                    <Model
                        name='Airbnb'
                        features={[
                            'Semicolon required',
                            'Trailing comma required',
                            'No space before function call parenthesis',
                        ]}
                    />
                    <Model
                        name='Standard'
                        features={[
                            'Trailing comma not allowed',
                            'Space before function call parenthesis',
                        ]}
                    />

                    <Model name='None' features={['Start from scratch']} />
                </div>
            </div>
        </>
    );
};

export default Home;
