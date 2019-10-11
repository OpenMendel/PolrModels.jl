var documenterSearchIndex = {"docs":
[{"location":"#OrdinalMultinomialModels.jl-1","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"OrdinalMultinomialModels.jl provides Julia utilities to fit ordered multinomial models, including proportional odds model and ordered Probit model as special cases. ","category":"page"},{"location":"#Installation-1","page":"OrdinalMultinomialModels.jl","title":"Installation","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"This package requires Julia v0.7 or later. The package has not yet been registered and must be installed using the repository location. Start julia and use the ] key to switch to the package manager REPL","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"(v1.1) pkg> add https://github.com/OpenMendel/OrdinalMultinomialModels.jl","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"# Machine info for results in this tutorial\nversioninfo()","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Julia Version 1.1.0\nCommit 80516ca202 (2019-01-21 21:24 UTC)\nPlatform Info:\n  OS: macOS (x86_64-apple-darwin14.5.0)\n  CPU: Intel(R) Core(TM) i7-6920HQ CPU @ 2.90GHz\n  WORD_SIZE: 64\n  LIBM: libopenlibm\n  LLVM: libLLVM-6.0.1 (ORCJIT, skylake)\nEnvironment:\n  JULIA_EDITOR = code","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"# for use in this tutorial\nusing OrdinalMultinomialModels, BenchmarkTools, RDatasets","category":"page"},{"location":"#Example-data-1","page":"OrdinalMultinomialModels.jl","title":"Example data","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"housing is a data set from R package MASS. The outcome of interest is Sat (satisfication) that takes values Low, Medium, or High. Predictors include Infl (inflation, categorical), Type (housing type, categorical), and Cont (categorical). Freq codes number of observation for each combination of levels.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"housing = dataset(\"MASS\", \"housing\")","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"<table class=\"data-frame\"><thead><tr><th></th><th>Sat</th><th>Infl</th><th>Type</th><th>Cont</th><th>Freq</th></tr><tr><th></th><th>Categorical…</th><th>Categorical…</th><th>Categorical…</th><th>Categorical…</th><th>Int32</th></tr></thead><tbody><p>72 rows × 5 columns</p><tr><th>1</th><td>Low</td><td>Low</td><td>Tower</td><td>Low</td><td>21</td></tr><tr><th>2</th><td>Medium</td><td>Low</td><td>Tower</td><td>Low</td><td>21</td></tr><tr><th>3</th><td>High</td><td>Low</td><td>Tower</td><td>Low</td><td>28</td></tr><tr><th>4</th><td>Low</td><td>Medium</td><td>Tower</td><td>Low</td><td>34</td></tr><tr><th>5</th><td>Medium</td><td>Medium</td><td>Tower</td><td>Low</td><td>22</td></tr><tr><th>6</th><td>High</td><td>Medium</td><td>Tower</td><td>Low</td><td>36</td></tr><tr><th>7</th><td>Low</td><td>High</td><td>Tower</td><td>Low</td><td>10</td></tr><tr><th>8</th><td>Medium</td><td>High</td><td>Tower</td><td>Low</td><td>11</td></tr><tr><th>9</th><td>High</td><td>High</td><td>Tower</td><td>Low</td><td>36</td></tr><tr><th>10</th><td>Low</td><td>Low</td><td>Apartment</td><td>Low</td><td>61</td></tr><tr><th>11</th><td>Medium</td><td>Low</td><td>Apartment</td><td>Low</td><td>23</td></tr><tr><th>12</th><td>High</td><td>Low</td><td>Apartment</td><td>Low</td><td>17</td></tr><tr><th>13</th><td>Low</td><td>Medium</td><td>Apartment</td><td>Low</td><td>43</td></tr><tr><th>14</th><td>Medium</td><td>Medium</td><td>Apartment</td><td>Low</td><td>35</td></tr><tr><th>15</th><td>High</td><td>Medium</td><td>Apartment</td><td>Low</td><td>40</td></tr><tr><th>16</th><td>Low</td><td>High</td><td>Apartment</td><td>Low</td><td>26</td></tr><tr><th>17</th><td>Medium</td><td>High</td><td>Apartment</td><td>Low</td><td>18</td></tr><tr><th>18</th><td>High</td><td>High</td><td>Apartment</td><td>Low</td><td>54</td></tr><tr><th>19</th><td>Low</td><td>Low</td><td>Atrium</td><td>Low</td><td>13</td></tr><tr><th>20</th><td>Medium</td><td>Low</td><td>Atrium</td><td>Low</td><td>9</td></tr><tr><th>21</th><td>High</td><td>Low</td><td>Atrium</td><td>Low</td><td>10</td></tr><tr><th>22</th><td>Low</td><td>Medium</td><td>Atrium</td><td>Low</td><td>8</td></tr><tr><th>23</th><td>Medium</td><td>Medium</td><td>Atrium</td><td>Low</td><td>8</td></tr><tr><th>24</th><td>High</td><td>Medium</td><td>Atrium</td><td>Low</td><td>12</td></tr><tr><th>25</th><td>Low</td><td>High</td><td>Atrium</td><td>Low</td><td>6</td></tr><tr><th>26</th><td>Medium</td><td>High</td><td>Atrium</td><td>Low</td><td>7</td></tr><tr><th>27</th><td>High</td><td>High</td><td>Atrium</td><td>Low</td><td>9</td></tr><tr><th>28</th><td>Low</td><td>Low</td><td>Terrace</td><td>Low</td><td>18</td></tr><tr><th>29</th><td>Medium</td><td>Low</td><td>Terrace</td><td>Low</td><td>6</td></tr><tr><th>30</th><td>High</td><td>Low</td><td>Terrace</td><td>Low</td><td>7</td></tr><tr><th>&vellip;</th><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td><td>&vellip;</td></tr></tbody></table>","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"There are 72 unique combination of levels and the total number of observations is 1,681.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"size(housing, 1), sum(housing[:Freq])","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"(72, 1681)","category":"page"},{"location":"#Syntax-1","page":"OrdinalMultinomialModels.jl","title":"Syntax","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"polr is the main function of fitting ordered multinomial model. For documentation, type ?polr at Julia REPL.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"polr","category":"page"},{"location":"#OrdinalMultinomialModels.polr","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.polr","text":"polr(formula, df, link, solver=NLoptSolver(algorithm=:LD_SLSQP, maxeval=4000))\npolr(X, y, link, solver=NLoptSolver(algorithm=:LD_SLSQP, maxeval=4000))\n\nFit ordered multinomial model by maximum likelihood estimation.\n\nPositional arguments\n\nformula::Formula: a model formula specifying responses and regressors.\ndf::DataFrame: a dataframe. Response variable should take integer values    starting from 1.\ny::Vector: integer vector taking values in 1,...,J.\nX::Matrix: n x p covariate matrix excluding intercept.\nlink::GLM.Link: LogitLink() (default), ProbitLink(), CauchitLink(), or CloglogLink().\nsolver: NLoptSolver() (default) or IpoptSolver().\n\nKeyword arguments\n\nwts::AbstractVector=similar(X, 0): observation weights.\n\nOutput\n\ndd:PolrModel: a PolrModel type.\n\n\n\n\n\n","category":"function"},{"location":"#Fit-ordered-multinomial-models-1","page":"OrdinalMultinomialModels.jl","title":"Fit ordered multinomial models","text":"","category":"section"},{"location":"#Proportional-odds-model-1","page":"OrdinalMultinomialModels.jl","title":"Proportional odds model","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"To fit an ordered multinomial model using default link link=LogitLink(), i.e., proportional odds model","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"house_po = polr(@formula(Sat ~ Infl + Type + Cont), housing, wts = housing[:Freq])","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"StatsModels.DataFrameRegressionModel{OrdinalMultinomialModel{Int64,Float64,LogitLink},Array{Float64,2}}\n\nFormula: Sat ~ Infl + Type + Cont\n\nCoefficients:\n                  Estimate Std.Error  t value Pr(>|t|)\nintercept1|2     -0.496141  0.124541 -3.98376   0.0002\nintercept2|3      0.690706  0.125212  5.51628    <1e-6\nInfl: Medium      0.566392  0.104963  5.39611    <1e-5\nInfl: High         1.28881  0.126705  10.1718   <1e-14\nType: Apartment  -0.572352  0.118747 -4.81991    <1e-5\nType: Atrium     -0.366182  0.156766 -2.33586   0.0226\nType: Terrace     -1.09101  0.151514 -7.20075    <1e-9\nCont: High        0.360284 0.0953574  3.77825   0.0003","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Since there are J=3 categories in Sat, the fitted model has 2 intercept parameters theta_1 and theta_2 that satisfy theta_1 le theta_2. beta_1 beta_2 are regression coefficients for Infl (3 levels), beta_3 beta_4 beta_5 for Type (4 levels), and beta_6 for Cont (2 levels). ","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Deviance (-2 loglikelihood) of the fitted model is","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"deviance(house_po)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"3479.149299072586","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Estimated regression coefficients are","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"coef(house_po)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"8-element Array{Float64,1}:\n -0.4961406134145464 \n  0.6907056439400198 \n  0.5663915864515743 \n  1.288810825003427  \n -0.5723518911944654 \n -0.36618227185604263\n -1.0910115747375622 \n  0.36028444175284197","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"with standard errors","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"stderror(house_po)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"8-element Array{Float64,1}:\n 0.12454076603722913\n 0.1252121074560087 \n 0.10496298447216806\n 0.1267047666889804 \n 0.11874734570694132\n 0.1567658347801272 \n 0.15151363694373737\n 0.09535742939732537","category":"page"},{"location":"#Ordered-probit-model-1","page":"OrdinalMultinomialModels.jl","title":"Ordered probit model","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"To fit an ordered probit model, we use link ProbitLink()","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"house_op = polr(@formula(Sat ~ Infl + Type + Cont), housing, ProbitLink(), wts = housing[:Freq])","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"StatsModels.DataFrameRegressionModel{OrdinalMultinomialModel{Int64,Float64,ProbitLink},Array{Float64,2}}\n\nFormula: Sat ~ Infl + Type + Cont\n\nCoefficients:\n                  Estimate Std.Error  t value Pr(>|t|)\nintercept1|2     -0.299829 0.0761614 -3.93676   0.0002\nintercept2|3       0.42672 0.0763991   5.5854    <1e-6\nInfl: Medium      0.346423 0.0641796  5.39771    <1e-5\nInfl: High        0.782914 0.0762645  10.2658   <1e-14\nType: Apartment  -0.347538 0.0722116 -4.81278    <1e-5\nType: Atrium     -0.217889 0.0955741 -2.27979   0.0260\nType: Terrace    -0.664175 0.0919294 -7.22484    <1e-9\nCont: High        0.222386 0.0581214  3.82624   0.0003","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"deviance(house_op)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"3479.6888425652414","category":"page"},{"location":"#Proportional-hazards-model-1","page":"OrdinalMultinomialModels.jl","title":"Proportional hazards model","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"To fit a proportional hazards model, we use CloglogLink()","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"house_ph = polr(@formula(Sat ~ Infl + Type + Cont), housing, CloglogLink(), wts = housing[:Freq])","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"StatsModels.DataFrameRegressionModel{OrdinalMultinomialModel{Int64,Float64,CloglogLink},Array{Float64,2}}\n\nFormula: Sat ~ Infl + Type + Cont\n\nCoefficients:\n                  Estimate Std.Error  t value Pr(>|t|)\nintercept1|2     -0.796225 0.0904739  -8.8006   <1e-11\nintercept2|3     0.0553535 0.0866662 0.638697   0.5253\nInfl: Medium      0.382045 0.0701219  5.44829    <1e-6\nInfl: High        0.915384 0.0924967  9.89639   <1e-13\nType: Apartment  -0.407228 0.0861331 -4.72789    <1e-4\nType: Atrium      -0.28056  0.112949 -2.48396   0.0156\nType: Terrace    -0.742481  0.102084 -7.27321    <1e-9\nCont: High        0.209235 0.0653756   3.2005   0.0021","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"deviance(house_ph)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"3484.0531705626904","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"From the deviances, we see that the proportional odds model (logit link) has the best fit among all three models.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"deviance(house_po), deviance(house_op), deviance(house_ph)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"(3479.149299072586, 3479.6888425652414, 3484.0531705626904)","category":"page"},{"location":"#Alternative-syntax-without-using-DataFrame-1","page":"OrdinalMultinomialModels.jl","title":"Alternative syntax without using DataFrame","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"An alternative syntax is useful when it is inconvenient to use DataFrame","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"polr(X, y, link, solver; wts)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"where y is the response vector and X is the n x p predictor matrix excluding intercept.","category":"page"},{"location":"#Optimization-algorithms-1","page":"OrdinalMultinomialModels.jl","title":"Optimization algorithms","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"PolrModels.jl relies on nonlinear programming (NLP) optimization algorithms to find the maximum likelihood estimate (MLE). User can input any solver supported by the MathProgBase.jl package (see http://www.juliaopt.org) as the 4th argument of polr function. Common choices are:  ","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Ipopt solver: IpoptSolver(print_level=0). See Ipopt.jl for numerous arugments to IpoptSolver. For example, setting print_level=5 is useful for diagnosis purpose.   \nNLopt package: NLoptSolver(algorithm=:LD_SLSQP), NLoptSolver(algorithm=:LD_LBFGS). See NLopt algorithms for all algorithms in NLopt.jl.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"When optimization fails, user can always try another algorithm.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Use Ipopt (interior-point) solver","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"polr(@formula(Sat ~ Infl + Type + Cont), housing, LogitLink(), \n    IpoptSolver(print_level=3); wts = housing[:Freq])","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"******************************************************************************\nThis program contains Ipopt, a library for large-scale nonlinear optimization.\n Ipopt is released as open source code under the Eclipse Public License (EPL).\n         For more information visit http://projects.coin-or.org/Ipopt\n******************************************************************************\n\nTotal number of variables............................:        8\n                     variables with only lower bounds:        0\n                variables with lower and upper bounds:        0\n                     variables with only upper bounds:        0\nTotal number of equality constraints.................:        0\nTotal number of inequality constraints...............:        0\n        inequality constraints with only lower bounds:        0\n   inequality constraints with lower and upper bounds:        0\n        inequality constraints with only upper bounds:        0\n\n\nNumber of Iterations....: 38\n\n                                   (scaled)                 (unscaled)\nObjective...............:   2.0594068522767617e+02    1.7395746495294738e+03\nDual infeasibility......:   8.1478360269928591e-09    6.8824520931403241e-08\nConstraint violation....:   0.0000000000000000e+00    0.0000000000000000e+00\nComplementarity.........:   0.0000000000000000e+00    0.0000000000000000e+00\nOverall NLP error.......:   8.1478360269928591e-09    6.8824520931403241e-08\n\n\nNumber of objective function evaluations             = 91\nNumber of objective gradient evaluations             = 39\nNumber of equality constraint evaluations            = 0\nNumber of inequality constraint evaluations          = 0\nNumber of equality constraint Jacobian evaluations   = 0\nNumber of inequality constraint Jacobian evaluations = 0\nNumber of Lagrangian Hessian evaluations             = 0\nTotal CPU secs in IPOPT (w/o function evaluations)   =      0.050\nTotal CPU secs in NLP function evaluations           =      0.006\n\nEXIT: Optimal Solution Found.\n\n\n\n\n\nStatsModels.DataFrameRegressionModel{OrdinalMultinomialModel{Int64,Float64,LogitLink},Array{Float64,2}}\n\nFormula: Sat ~ Infl + Type + Cont\n\nCoefficients:\n                  Estimate Std.Error  t value Pr(>|t|)\nintercept1|2     -0.496135  0.124541 -3.98372   0.0002\nintercept2|3      0.690708  0.125212   5.5163    <1e-6\nInfl: Medium      0.566394  0.104963  5.39613    <1e-5\nInfl: High         1.28882  0.126705  10.1718   <1e-14\nType: Apartment   -0.57235  0.118747  -4.8199    <1e-5\nType: Atrium     -0.366186  0.156766 -2.33588   0.0226\nType: Terrace     -1.09101  0.151514 -7.20077    <1e-9\nCont: High        0.360284 0.0953575  3.77825   0.0003","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Use SLSQP (sequential quadratic programming) in NLopt.jl package","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"polr(@formula(Sat ~ Infl + Type + Cont), housing, LogitLink(), \n    NLoptSolver(algorithm=:LD_SLSQP); wts = housing[:Freq])","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"StatsModels.DataFrameRegressionModel{OrdinalMultinomialModel{Int64,Float64,LogitLink},Array{Float64,2}}\n\nFormula: Sat ~ Infl + Type + Cont\n\nCoefficients:\n                  Estimate Std.Error  t value Pr(>|t|)\nintercept1|2     -0.496141  0.124541 -3.98376   0.0002\nintercept2|3      0.690706  0.125212  5.51628    <1e-6\nInfl: Medium      0.566392  0.104963  5.39611    <1e-5\nInfl: High         1.28881  0.126705  10.1718   <1e-14\nType: Apartment  -0.572352  0.118747 -4.81991    <1e-5\nType: Atrium     -0.366182  0.156766 -2.33586   0.0226\nType: Terrace     -1.09101  0.151514 -7.20075    <1e-9\nCont: High        0.360284 0.0953574  3.77825   0.0003","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Use LBFGS (quasi-Newton algorithm) in NLopt.jl package","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"polr(@formula(Sat ~ 0 + Infl + Type + Cont), housing, LogitLink(), \n    NLoptSolver(algorithm=:LD_LBFGS); wts = housing[:Freq])","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"StatsModels.DataFrameRegressionModel{OrdinalMultinomialModel{Int64,Float64,LogitLink},Array{Float64,2}}\n\nFormula: Sat ~ Infl + Type + Cont\n\nCoefficients:\n                  Estimate Std.Error  t value Pr(>|t|)\nintercept1|2     -0.496111  0.124541 -3.98353   0.0002\nintercept2|3      0.690732  0.125212  5.51649    <1e-6\nInfl: Medium      0.566394  0.104963  5.39613    <1e-5\nInfl: High         1.28882  0.126705  10.1718   <1e-14\nType: Apartment  -0.572352  0.118747 -4.81991    <1e-5\nType: Atrium      -0.36616  0.156766 -2.33571   0.0227\nType: Terrace     -1.09102  0.151514  -7.2008    <1e-9\nCont: High        0.360319 0.0953575  3.77861   0.0003","category":"page"},{"location":"#Likelihood-ratio-test-(LRT)-1","page":"OrdinalMultinomialModels.jl","title":"Likelihood ratio test (LRT)","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"polr function calculates the Wald test (or t-test) p-value for each predictor in the model. To carry out the potentially more powerful likelihood ratio test (LRT), we need to fill the null and alternative models separately.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Step 1: Fit the null model with only Infl and Type factors.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"house_null = polr(@formula(Sat ~ Infl + Type), housing; wts = housing[:Freq])","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"StatsModels.DataFrameRegressionModel{OrdinalMultinomialModel{Int64,Float64,LogitLink},Array{Float64,2}}\n\nFormula: Sat ~ Infl + Type\n\nCoefficients:\n                  Estimate Std.Error  t value Pr(>|t|)\nintercept1|2     -0.672949  0.115559 -5.82341    <1e-6\nintercept2|3      0.505629  0.115147  4.39116    <1e-4\nInfl: Medium      0.548392  0.104613  5.24213    <1e-5\nInfl: High          1.2373  0.125448  9.86306   <1e-13\nType: Apartment  -0.521441  0.117616 -4.43341    <1e-4\nType: Atrium     -0.289347  0.155074 -1.86587   0.0666\nType: Terrace     -1.01404   0.14976  -6.7711    <1e-8","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Step 2: To test significance of the Cont variable, we use polrtest function. The first argument is the fitted null model, the second argument is the predictor vector to be tested","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"# last column of model matrix is coding for Cont (2-level factor)\ncont = modelmatrix(house_po.model)[:, end]\n# calculate p-value\npolrtest(house_null, cont; test=:LRT)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"0.000155351855453278","category":"page"},{"location":"#Score-test-1","page":"OrdinalMultinomialModels.jl","title":"Score test","text":"","category":"section"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"User can perform score test using the polrtest function too. Score test has the advantage that, when testing a huge number of predictors such as in genomewide association studies (GWAS), one only needs to fit the null model once and then testing each predictor is cheap. Both Wald and likelihood ratio test (LRT) need to fit a separate alternative model for each predictor being tested.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Step 1: Fit the null model with only Infl and Type factors.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"house_null = polr(@formula(Sat ~ Infl + Type), housing; wts = housing[:Freq])","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"StatsModels.DataFrameRegressionModel{OrdinalMultinomialModel{Int64,Float64,LogitLink},Array{Float64,2}}\n\nFormula: Sat ~ Infl + Type\n\nCoefficients:\n                  Estimate Std.Error  t value Pr(>|t|)\nintercept1|2     -0.672949  0.115559 -5.82341    <1e-6\nintercept2|3      0.505629  0.115147  4.39116    <1e-4\nInfl: Medium      0.548392  0.104613  5.24213    <1e-5\nInfl: High          1.2373  0.125448  9.86306   <1e-13\nType: Apartment  -0.521441  0.117616 -4.43341    <1e-4\nType: Atrium     -0.289347  0.155074 -1.86587   0.0666\nType: Terrace     -1.01404   0.14976  -6.7711    <1e-8","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Step 2: To test significance of the Cont variable, we use polrtest function. The first argument is the fitted null model, the second argument is the predictor vector to be tested","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"# last column of model matrix is coding for Cont (2-level factor)\ncont = modelmatrix(house_po.model)[:, end]\n# calculate p-value\npolrtest(house_null, cont; test=:score)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"0.0001648743597587817","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Step 3: Now suppose we want to test significance of another predictor, z1. We just need to call polrtest with z1 and the same fiited null model. No model fitting is needed.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"For demonstration purpose, we generate z1 randomly. The score test p-value of z1 is, not suprisingly, large.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"z1 = randn(nobs(house_null))\npolrtest(house_null, z1)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"0.1673512522966108","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"Step 4: We can also test a set of precitors or a factor.","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"z3 = randn(nobs(house_null), 3)\npolrtest(house_null, z3)","category":"page"},{"location":"#","page":"OrdinalMultinomialModels.jl","title":"OrdinalMultinomialModels.jl","text":"6.709335149358069e-10","category":"page"}]
}
