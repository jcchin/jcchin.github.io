import openmdao.api as om

class SeaLevel(om.ExplicitComponent):

    def setup(self):
        self.add_input('Temp')
        self.add_input('Contrails')
        self.add_output('flooding')

    def compute(self, inputs, outputs):
        outputs['flooding'] = inputs['Temp'] - inputs['Contrails']

class Emissions(om.ExplicitComponent):

    def setup(self):
        self.add_input('NOx')
        self.add_input('CO2')
        self.add_output('Temp')

    def compute(self, inputs, outputs):
        outputs['Temp'] = inputs['NOx'] - inputs['CO2']


class ClimateChange(om.Group):

    def setup(self):

        self.add_subsystem('SeaLevelRise', SeaLevel(), promotes_inputs=[('Contrails', 'Temp')])
        self.add_subsystem('GHGemissions', Emissions(), promotes_inputs=[('NOx', 'CO2')])

        self.connect('GHGemissions.Temp', 'SeaLevelRise.Temp')

        self.nonlinear_solver = om.NewtonSolver(solve_subsystems=False)
        self.linear_solver = om.DirectSolver()

p = om.Problem()
model = p.model
model.add_subsystem('climate', ClimateChange())
p.setup()
p.check_config(checks=['unconnected_inputs'], out_file=None)
p.run_model()