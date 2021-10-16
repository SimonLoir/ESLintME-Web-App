import Extractor from './Extractor';
import EOLLastRule from './rules/EOLLastRule';
type buildType = 'json' | 'js' | 'yml';
export default class Core {
    public rules = new Extractor();
    private outFile: any = {
        extends: undefined,
        rules: {},
        env: undefined,
    };
    /**
     * Creates a eslintrc file in the specified format
     * @param type  The format of the output file
     */
    public build(type: buildType) {
        this.populateRules();
        if (type == 'json') {
            return JSON.stringify(this.outFile, null, 4);
        }
    }

    public populateRules() {
        this.outFile['rules'] = {};
        const rules = this.outFile['rules'];
        const data = this.rules.extract();
        [EOLLastRule.esname].forEach((name) => {
            const d = data[name];
            if (!d) return;

            switch (name) {
                case EOLLastRule.esname:
                    rules[name] = ['error', d.value];
                    break;
            }
        });
    }
}
