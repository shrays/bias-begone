import React from "react";
import MatrixNL from "../components/MatrixNL";
import BarChart from "../components/MutualInfo";
import { useLocation } from "react-router-dom";
import './NonLinearCorrelation.css';

// const columnNames = ['Loan_ID', 'Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History', 'Property_Area', 'Loan_Status'];
// const nonlinearHeatMap = [[[1.0, 0.047160245781038744, 0.042098515594810135, 0.06960521373595616, 0.06217961426891183, 0.024804878635586607, 0.06332128595660949, 0.06308601873424738, 0.06718895547019738, 0.041795468786607504, 0.04036165706119793, 0.1621547602000627, 0.029151828560756352], [0.047160245781038744, 1.0, 0.36961200447005077, 0.17208586931808117, 0.048478015234709904, 0.028662566306837358, 0.08082914486326982, 0.20019533914164084, 0.13865347402938147, 0.08818219397423342, 0.01270812603564337, 0.06917151110595408, 0.021239083089500024], [0.042098515594810135, 0.36961200447005077, 1.0, 0.35679172928479386, 0.014368861698151542, 0.02144097187318126, 0.04256081617352017, 0.25719279649967547, 0.16806325357016552, 0.09908993761072424, 0.01796397967664843, 0.009925144019809939, 0.09318283276554304], [0.06960521373595616, 0.17208586931808117, 0.35679172928479386, 1.0, 0.050563759684620756, 0.05978556962150038, 0.10711489911962227, 0.07534251109751404, 0.1420265425651111, 0.10789113639160948, 0.03582518644705907, 0.045906770859658615, 0.03365586440970933], [0.06217961426891183, 0.048478015234709904, 0.014368861698151542, 0.050563759684620756, 1.0, 0.015203569216943357, 0.18645291301596226, 0.09031511206941466, 0.18378239441141, 0.095908385901732, 0.06730045559127487, 0.06296064949475826, 0.08161742785624393], [0.024804878635586607, 0.028662566306837358, 0.02144097187318126, 0.05978556962150038, 0.015203569216943357, 1.0, 0.1924436211340072, 0.07306683268779797, 0.10235857391901469, 0.029798922887206963, 0.03467904350973886, 0.023560208065879634, 0.005604727897370779], [0.06332128595660949, 0.08082914486326982, 0.04256081617352017, 0.10711489911962227, 0.18645291301596226, 0.1924436211340072, 1.0, 0.28200170300749283, 0.5680886582463559, 0.05796696050438653, 0.04560960381471389, 0.07088277891659708, 0.03554569193261655], [0.06308601873424738, 0.20019533914164084, 0.25719279649967547, 0.07534251109751404, 0.09031511206941466, 0.07306683268779797, 0.28200170300749283, 1.0, 0.27862799538947886, 0.06933870293572579, 0.026220740861750177, 0.07931805245068586, 0.07461662853353375], [0.06718895547019738, 0.13865347402938147, 0.16806325357016552, 0.1420265425651111, 0.18378239441141, 0.10235857391901469, 0.5680886582463559, 0.27862799538947886, 1.0, 0.08204667116493489, 0.03419763668334476, 0.10066748221684786, 0.06583361148239913], [0.041795468786607504, 0.08818219397423342, 0.09908993761072424, 0.10789113639160948, 0.095908385901732, 0.029798922887206963, 0.05796696050438653, 0.06933870293572579, 0.08204667116493489, 1.0, 0.04845045206188517, 0.09516848381219987, 0.0489641396846725], [0.04036165706119793, 0.01270812603564337, 0.01796397967664843, 0.03582518644705907, 0.06730045559127487, 0.03467904350973886, 0.04560960381471389, 0.026220740861750177, 0.03419763668334476, 0.04845045206188517, 1.0, 0.025779286778275772, 0.5356381836572338], [0.1621547602000627, 0.06917151110595408, 0.009925144019809939, 0.045906770859658615, 0.06296064949475826, 0.023560208065879634, 0.07088277891659708, 0.07931805245068586, 0.10066748221684786, 0.09516848381219987, 0.025779286778275772, 1.0, 0.08568106722951693], [0.029151828560756352, 0.021239083089500024, 0.09318283276554304, 0.03365586440970933, 0.08161742785624393, 0.005604727897370779, 0.03554569193261655, 0.07461662853353375, 0.06583361148239913, 0.0489641396846725, 0.5356381836572338, 0.08568106722951693, 1.0]], [[1.0, -0.02350580901539239, -0.005024864490362274, 0.050481293041898405, 0.040973031645889293, 0.010379219455096737, 0.005157023842115535, -0.015217050112385546, 0.024245889668282918, -0.02387798469171923, -0.024837641185411492, -0.12800599709785934, 0.012388049684506464], [-0.02350580901539239, 1.0, 0.3696120044700511, 0.15833463896437716, 0.04847801523471015, -0.02866256630683199, 0.06502808728193177, 0.18182213477982398, 0.12452709563166559, -0.09570481555613415, 0.012708126035646599, -0.02255772039917999, 0.02123908308950088], [-0.005024864490362274, 0.3696120044700511, 1.0, 0.3405772656191311, 0.01436886169815629, -0.02144097187318089, 0.008919017698586643, 0.23250105213217379, 0.15224422539491259, -0.11679041555166071, 0.01796397967664662, 0.008576409274600594, 0.093182832765543], [0.050481293041898405, 0.15833463896437716, 0.3405772656191311, 1.0, 0.042283706535534406, 0.053589535970408185, 0.09996954108380011, -0.028508531272446708, 0.108654669948238, -0.10645315535153271, -0.023025190600298586, 0.020895258574837733, 0.008879838310656037], [0.040973031645889293, 0.04847801523471015, 0.01436886169815629, 0.042283706535534406, 1.0, -0.015203569216942856, -0.15479921305104233, -0.014343571977763077, -0.13042092108734457, -0.07307253246039148, -0.06730045559127446, -0.05767533989047514, -0.08161742785624256], [0.010379219455096737, -0.02866256630683199, -0.02144097187318089, 0.053589535970408185, -0.015203569216942856, 1.0, 0.13664516045350134, -0.053082026641013885, 0.0734222808897515, -0.04135938820669926, 0.03467904350973928, -0.021621522859214135, -0.0056047278973629395], [0.005157023842115535, 0.06502808728193177, 0.008919017698586643, 0.09996954108380011, -0.15479921305104233, 0.13664516045350134, 1.0, -0.21866111065833876, 0.3668825156043412, -0.020719805472630075, 0.021985625099220644, -0.061272621815927186, -0.01697423554963848], [-0.015217050112385546, 0.18182213477982398, 0.23250105213217379, -0.028508531272446708, -0.014343571977763077, -0.053082026641013885, -0.21866111065833876, 1.0, 0.18624465048513097, -0.012069209136839372, 0.010342889299523593, -0.05778280071283957, 0.037704922507554146], [0.024245889668282918, 0.12452709563166559, 0.15224422539491259, 0.108654669948238, -0.13042092108734457, 0.0734222808897515, 0.3668825156043412, 0.18624465048513097, 1.0, 0.035994096110278984, -0.0023683575576104194, -0.08602052473004208, -0.03563809683663849], [-0.02387798469171923, -0.09570481555613415, -0.11679041555166071, -0.10645315535153271, -0.07307253246039148, -0.04135938820669926, -0.020719805472630075, -0.012069209136839372, 0.035994096110278984, 1.0, 0.011606302022862157, -0.04761790390980089, -0.022097378770864155], [-0.024837641185411492, 0.012708126035646599, 0.01796397967664662, -0.023025190600298586, -0.06730045559127446, 0.03467904350973928, 0.021985625099220644, 0.010342889299523593, -0.0023683575576104194, 0.011606302022862157, 1.0, -0.004636219980221462, 0.5356381836572336], [-0.12800599709785934, -0.02255772039917999, 0.008576409274600594, 0.020895258574837733, -0.05767533989047514, -0.021621522859214135, -0.061272621815927186, -0.05778280071283957, -0.08602052473004208, -0.04761790390980089, -0.004636219980221462, 1.0, 0.024480508328281], [0.012388049684506464, 0.02123908308950088, 0.093182832765543, 0.008879838310656037, -0.08161742785624256, -0.0056047278973629395, -0.01697423554963848, 0.037704922507554146, -0.03563809683663849, -0.022097378770864155, 0.5356381836572336, 0.024480508328281, 1.0]], [[0.9999999999999989, 0.15728313105968916, 0.15343016368785267, 0.14236551444131298, 0.1515976907024372, 0.12763985667001568, 0.14851974327262685, 0.1471031734821665, 0.15131193124896522, 0.13990485301714223, 0.12252292151419271, 0.16849471811950567, 0.13490282226214267], [0.15728313105968916, 0.6922156730292713, 0.09483433805699404, 0.02663166213024304, 0.0017619099811191279, 0.0005786801525511056, 0.13830729164681901, 0.16620224285566015, 0.1198384129837877, 0.014231605893090167, 0.00011493085882995722, 0.009084851518979788, 0.00032253009502750525], [0.15343016368785267, 0.09483433805699404, 0.935109129919691, 0.10846837490929623, 0.00014954641588707916, 0.0003293289352697814, 0.1442582564083182, 0.20196890595811612, 0.1135996522015371, 0.02420688692707671, 0.00023110418524196775, 0.00010373578956877068, 0.006184876300024999], [0.14236551444131298, 0.02663166213024304, 0.10846837490929623, 0.9789104131324523, 0.003018837993056769, 0.005430537054554288, 0.15974673907290998, 0.13773036519331344, 0.1388829260437563, 0.023164727463546572, 0.003586944045282496, 0.006304706581053717, 0.005868749488853987], [0.1515976907024372, 0.0017619099811191279, 0.00014954641588707916, 0.003018837993056769, 0.7645401771922249, 0.00016864667889320695, 0.17462019740292037, 0.13017706641217142, 0.12098335226249236, 0.01260350005321066, 0.0030985429057764314, 0.0035898574179715915, 0.004686275680536548], [0.12763985667001568, 0.0005786801525511056, 0.0003293289352697814, 0.005430537054554288, 0.00016864667889320695, 0.6886348025954265, 0.17520603866729223, 0.12128738570956751, 0.10495451902920455, 0.005911549692506945, 0.0009043833798337736, 0.0005068650015586056, 2.2604577355863685e-05], [0.14851974327262685, 0.13830729164681901, 0.1442582564083182, 0.15974673907290998, 0.17462019740292037, 0.17520603866729223, 0.9999999999999989, 0.24499121360457193, 0.28486071146936814, 0.13363340792580003, 0.14976363414526825, 0.15248730376358383, 0.14356290670587613], [0.1471031734821665, 0.16620224285566015, 0.20196890595811612, 0.13773036519331344, 0.13017706641217142, 0.12128738570956751, 0.24499121360457193, 0.9999999999999989, 0.1775275421520809, 0.14311190425590276, 0.11541613746404158, 0.11600810013183273, 0.1414161816932027], [0.15131193124896522, 0.1198384129837877, 0.1135996522015371, 0.1388829260437563, 0.12098335226249236, 0.10495451902920455, 0.28486071146936814, 0.1775275421520809, 0.9999821963316861, 0.10368089296557263, 0.10920475642257182, 0.1263005864409438, 0.11280627731703363], [0.13990485301714223, 0.014231605893090167, 0.02420688692707671, 0.023164727463546572, 0.01260350005321066, 0.005911549692506945, 0.13363340792580003, 0.14311190425590276, 0.10368089296557263, 0.520841295924842, 0.012352270042005663, 0.022536862725922122, 0.020387409258694093], [0.12252292151419271, 0.00011493085882995722, 0.00023110418524196775, 0.003586944045282496, 0.0030985429057764314, 0.0009043833798337736, 0.14976363414526825, 0.11541613746404158, 0.10920475642257182, 0.012352270042005663, 0.5941375121506457, 0.0013525389347986412, 0.20135392508311192], [0.16849471811950567, 0.009084851518979788, 0.00010373578956877068, 0.006304706581053717, 0.0035898574179715915, 0.0005068650015586056, 0.15248730376358383, 0.11600810013183273, 0.1263005864409438, 0.022536862725922122, 0.0013525389347986412, 0.9952206568627839, 0.014585791848814584], [0.13490282226214267, 0.00032253009502750525, 0.006184876300024999, 0.005868749488853987, 0.004686275680536548, 2.2604577355863685e-05, 0.14356290670587613, 0.1414161816932027, 0.11280627731703363, 0.020387409258694093, 0.20135392508311192, 0.014585791848814584, 0.896275858324928]]];

// const cn = ['Loan_ID', 'Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History', 'Property_Area'];
// const mutual_info = [0.04638958559312912, 0.036064388373208696, 0.0, 0.3173489828619789, 0.33220378296325814, 0.0, 0.07554076722204484, 0.1385546480747136, 0.0, 0.0, 1.0, 0.3172896001026397];


const NonLinearCorrelation = () => {
    const location = useLocation();
    const { summary, tips, heatMap, columnNames, nonlinearHeatMap, mutual_info } = location.state;
	return (
		<div className="page">
			<h1>
				Non-Linear Correlations
			</h1>
            <br></br>

            <h2>Mutual Information Correlation</h2>
            <div className="MatrixNL-container">
                <BarChart columnNames={columnNames.slice(0, -1)} values={mutual_info} />;
            </div>
            <p>Mutual Information is a non-linear statistical measure that captures the dependency between variables. Unlike correlation coefficients that primarily focus on linear relationships, MI is capable of detecting both linear and non-linear dependencies. It quantifies how much knowing the value of one variable reduces uncertainty about the value of another. This method is particularly useful in datasets with categorical variables or in scenarios where the relationships between variables are complex and non-linear. The bar chart presents each feature's MI score, offering a clear visual representation of each feature's importance in predicting the target variable. Higher MI scores indicate a stronger relationship with the target variable. This visualization helps in identifying the most influential features, which is crucial for feature selection in machine learning models and ensuring they capture the most relevant patterns in the data. By understanding these relationships, we can better mitigate biases and improve the model's predictive accuracy.</p>

            <h2>Distance Correlation</h2>
            <div className="MatrixNL-container">
                <MatrixNL
                    data={nonlinearHeatMap[0]}
                    columnNames={columnNames}
                />
            </div>
            <p>Distance correlation is an advanced statistical measure used to identify both linear and non-linear associations between variables. Unlike Pearson's correlation, which measures linear relationships (i.e., when one variable increases or decreases in a straight-line relationship with another), distance correlation can detect complex interactions that are not just straight-line relationships. It's particularly useful when the relationship between variables is obscured by these non-linear interactions. This method is crucial for identifying biases in data that traditional methods like Pearson’s correlation might overlook. By recognizing these complex relationships, distance correlation helps ensure machine learning models don't inherit biases that can be hidden in non-linear patterns, thereby supporting the development of fairer and more accurate predictive models.

</p>

            <h2>Kendall's Tau Correlation</h2>
            <div className="MatrixNL-container">
                <MatrixNL
                    data={nonlinearHeatMap[1]}
                    columnNames={columnNames}
                />
            </div>
            <p>Kendall's Tau is a non-parametric statistic, meaning it does not assume any specific distribution in the data, used to measure the ordinal association between two quantities. An ordinal association refers to the rank order of the data points. For example, if one variable tends to increase as another increases, this method will detect that relationship, even if the increase is not consistent or proportional (as required by Pearson's correlation). Kendall's Tau is valuable for analyzing data sets where the relationship is monotonic, which means that the variables move in the same direction at a consistent rate but not necessarily at a constant rate. This correlation method is effective in scenarios where data do not conform to normal distributions or when measurements are on an ordinal scale (e.g., rankings or ratings). It helps in understanding biases in datasets with monotonic but not necessarily linear relationships, providing critical insights for creating unbiased machine learning models.</p>

            <h2>Maximal Information Coefficient Correlation</h2>
            <div className="MatrixNL-container">
                <MatrixNL
                    data={nonlinearHeatMap[2]}
                    columnNames={columnNames}
                />
            </div>
            <p>The Maximal Information Coefficient (MIC) is a statistical technique designed to capture a wide variety of relationships, including but not limited to linear (straight-line), exponential (increasing or decreasing rapidly), and periodic (repeating patterns) relationships. Unlike other correlation measures that focus on specific types of relationships, MIC is designed to identify both functional (where one variable is a function of another, in any form) and non-functional relationships (where the relationship does not follow a specific functional form but still has a pattern). This versatility makes MIC a valuable tool for analyzing complex datasets where the nature of the relationships between variables is unknown or highly varied. By using MIC, analysts can uncover hidden biases in data, particularly in cases where the data contains intricate patterns that simpler correlation measures might miss. This level of insight is crucial for ensuring the integrity and fairness of machine learning models, as it helps in identifying and addressing biases that could affect the model's performance and decision-making process.</p>
            
		</div>
	);
};

export default NonLinearCorrelation;
