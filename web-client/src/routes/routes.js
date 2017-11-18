import home from '../components/Home.vue';
import ETL from '../components/ETL.vue';
import ETLSingleStep from '../components/ETL-single-step.vue';
import ETLThreeSteps from '../components/ETL-three-steps.vue';

export default [
  {path: "/", component: home},
  {path: "/etl", component: ETL,
  children: [
  {
    path:'single-step',
    name: 'single-step',
    component: ETLSingleStep
  },
    {
      path:'three-steps',
      name: 'three-steps',
      component: ETLThreeSteps
    }]
  }
]
