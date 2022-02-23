import RuleRepresentation from '@components/RuleGraphicalRepresentation';
import Rule from '@core/Rule';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useState } from 'react';
import RuleLevelChooser from './RuleLevelChooser';
import FullScreenOptionsChooser from './FullScreenOptionsChooser';
import {
    airbnb,
    google,
    recommended_rules,
    standard,
} from 'utils/eslint.configs';
export default function RuleGraphicalEditor({
    worker,
    data,
    exception,
    name,
    options,
}: {
    worker: Worker;
    data: any;
    exception: any;
    name: string;
    options: RuleData[];
}) {
    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    let rule_data = exception ?? data;
    if (rule_data == undefined && options.length != 0) rule_data = [0];
    const normalized_data = Rule.normalize(rule_data);
    const opt = options ?? [];
    const opt_nbr =
        opt.length +
        (airbnb[name] != undefined ? 1 : 0) +
        (standard[name] != undefined ? 1 : 0) +
        (recommended_rules[name] != undefined ? 1 : 0) +
        (google[name] != undefined ? 1 : 0);

    const setException = (data: any) => {
        worker.postMessage({
            type: 'set-exception',
            content: { name, data },
        });
    };

    const removeException = () => {
        console.log(name);
        worker.postMessage({
            type: 'remove-exception',
            content: name,
        });
    };

    const changeLevel = (newLevel: 0 | 1 | 2) => {
        if (Array.isArray(rule_data) && rule_data.length > 0) {
            const array = [...rule_data];
            array[0] = newLevel;
            return setException(array);
        }
        return setException([newLevel]);
    };

    return (
        <div
            style={{
                lineHeight: '60px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 45px',
                borderBottom: '1px solid gray',
                outline: 'none',
                userSelect: 'none',
            }}
        >
            <span
                onClick={() => setShowMore((e) => !e)}
                style={{ cursor: 'pointer' }}
            >
                {name}{' '}
                {exception ? (
                    <LockIcon
                        style={{ fontSize: '15px', verticalAlign: 'middle' }}
                    ></LockIcon>
                ) : opt.length > 0 ? (
                    <div
                        style={{
                            display: 'inline-grid',
                            height: '18px',
                            width: '18px',
                            background: 'crimson',
                            verticalAlign: 'middle',
                            alignItems: 'center',
                            justifyItems: 'center',
                            lineHeight: '15px',
                            fontSize: '10px',
                            borderRadius: '50%',
                            color: 'white',
                        }}
                    >
                        {opt_nbr}
                    </div>
                ) : (
                    ''
                )}
            </span>
            <div style={{ textAlign: 'right' }}>
                <RuleLevelChooser
                    selected={normalized_data[0]}
                    onChange={changeLevel}
                />
            </div>
            <div>
                <SettingsIcon
                    style={{ verticalAlign: 'middle', cursor: 'pointer' }}
                    onClick={() => setShowMore((e) => !e)}
                ></SettingsIcon>
            </div>
            <div
                style={{
                    wordBreak: 'break-word',
                    gridColumn: '1 / span 3',
                    display: showMore ? 'block' : 'none',
                }}
            >
                {exception ? (
                    <p style={{ color: 'orange' }}>
                        You fixed a specific value to that rule. It means this
                        rule won't change even if you upload more files or
                        change the rules order.
                        <br />
                        <span
                            style={{
                                color: 'cornflowerblue',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                if (
                                    confirm(
                                        'If you modified this rule, you will lose the changes you made.'
                                    )
                                )
                                    removeException();
                            }}
                        >
                            Remove this exception
                            <LockResetIcon
                                style={{
                                    verticalAlign: 'middle',
                                    marginLeft: '5px',
                                    fontSize: '18px',
                                }}
                            />
                        </span>
                    </p>
                ) : (
                    ''
                )}
                <RuleRepresentation value={rule_data} icon={false} />
                {showModal ? (
                    <FullScreenOptionsChooser
                        name={name}
                        options={opt}
                        quit={() => setShowModal(false)}
                        select={(d) => setException(d)}
                    />
                ) : (
                    <p style={{ color: 'lightgreen' }}>
                        <button onClick={() => setShowModal(true)}>
                            Configure
                        </button>{' '}
                        {opt_nbr} option(s) available for this rule
                    </p>
                )}
            </div>
        </div>
    );
}
