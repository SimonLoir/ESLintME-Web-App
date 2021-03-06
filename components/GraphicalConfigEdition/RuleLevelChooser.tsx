import style from '@style/LevelChooser.module.scss';
import Clear from '@mui/icons-material/Clear';
import WarningIcon from '@mui/icons-material/Warning';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export default function RuleLevelChooser({
    selected,
    onChange,
}: {
    selected: 0 | 1 | 2;
    onChange: (data: 0 | 1 | 2) => void;
}) {
    return (
        <>
            <div
                className={
                    style.button +
                    ' ' +
                    (selected == 0 ? style.selected_disabled : '')
                }
                onClick={() => onChange(0)}
            >
                <Clear className={style.none} />
                <div className={style.tooltip}>Disabled</div>
            </div>
            <div
                className={
                    style.button +
                    ' ' +
                    (selected == 1 ? style.selected_warning : '')
                }
                onClick={() => onChange(1)}
            >
                <WarningIcon className={style.warning} />
                <div className={style.tooltip}>Warning</div>
            </div>
            <div
                className={
                    style.button +
                    ' ' +
                    (selected == 2 ? style.selected_error : '')
                }
                onClick={() => onChange(2)}
            >
                <ReportGmailerrorredIcon className={style.error} />
                <div className={style.tooltip}>Error</div>
            </div>
        </>
    );
}
