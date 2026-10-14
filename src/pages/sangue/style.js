import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    flexDirection:'column',
    padding: 18,
    paddingTop: 48,
    gap: 18,
  },

    header: {
     width: '100%',
     height: 162,
     borderRadius: 64,
    },

    headerContent: {
     width: '100%',
     height: '50%',
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
    },

    headerAreaBtns: {
     width: '48%',
     height: '100%',
     flexDirection: 'row',
     justifyContent: 'space-between',
      alignItems: 'center',
    },

    calendarBtn: {
     width: 96,
     height: 42,
     backgroundColor: 'white',
     borderRadius: 24,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 10,
    },

    perfilBtn: {
     width: 42,
     height: 42,
     backgroundColor: 'white',
     borderRadius: 24,
     justifyContent: 'center',
     alignItems: 'center',
    },

    headerNameUser: {
     width: '100%',
     height: '50%',
     justifyContent: 'flex-end',
     alignItems: 'flex-start',
     paddingBottom: 12,
    },

    content: {
     width: '100%',
     height: 298,
     borderRadius: 32,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
    },

    box: {
     width: '46%',
     height: '100%',
     borderRadius: 32,
     justifyContent: 'space-between',
    },

    box1: {
     width: '100%',
     height: '48%',
     backgroundColor: '#30c9f0',
     borderRadius: 32,
    },

    box2: {
     width: '100%',
     height: '48%',
     backgroundColor: '#30c9f0',
     borderRadius: 32,
    },

    boxWatter: {
     width: '46%',
     height: '100%',
     backgroundColor: '#30c9f0',
     borderRadius: 32,
    },

    cardCora: {
     width: '100%',
     height: 64,
     backgroundColor: '#30c9f0',
     borderRadius: 32,
    },

    boxSleep: {
     width: '100%',
     height: 132,
     backgroundColor: '#30c9f0',
     borderRadius: 32,
    },

 
});