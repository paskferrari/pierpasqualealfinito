import React from 'react';

type Experience = {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  stack?: string[];
};

type Project = {
  name: string;
  description: string;
  stack?: string[];
  link?: string;
  repo?: string;
};

type CVData = {
  identity: { fullName: string; role: string; location: string; avatarUrl?: string };
  contacts: { email?: string; phone?: string };
  links: { website?: string; linkedin?: string; github?: string };
  summary?: string;
  summaryHtml?: string;
  highlights?: string[];
  skills: { top: string[]; groups: Record<string, string[]> };
  languages: { name: string; level: string }[];
  experience: Experience[];
  projects?: Project[];
  education: { title: string; place: string; period: string }[];
  certifications: { name: string; issuer: string; year: string }[];
  interests?: string[];
};

interface PDFTemplateProps {
  data: CVData;
}

export default function PDFTemplate({ data }: PDFTemplateProps) {
  return (
    <div className="pdf-template" style={{
      fontFamily: 'Roboto, sans-serif',
      fontSize: '11px',
      lineHeight: '1.4',
      color: '#2d3748',
      maxWidth: '210mm',
      margin: '0 auto',
      padding: '20mm 25mm 25mm 25mm',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      minHeight: '297mm'
    }}>
      {/* Header with Photo */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '30px',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '25px',
        gap: '25px'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #e5e7eb',
          flexShrink: 0,
          backgroundColor: '#f9fafb',
          position: 'relative'
        }}>
          <img 
            src={data.identity.avatarUrl || "/media/5.jpg"} 
            alt="Profile" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block'
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '26px',
            fontWeight: '300',
            margin: '0 0 10px 0',
            letterSpacing: '2px',
            color: '#2d3748'
          }}>
            {data.identity.fullName}
          </h1>
          <p style={{
            fontSize: '16px',
            margin: '0 0 12px 0',
            fontWeight: '300',
            fontStyle: 'italic',
            color: '#4a5568'
          }}>
            {data.identity.role}
          </p>
          <p style={{
            fontSize: '10px',
            margin: '0',
            color: '#718096',
            letterSpacing: '0.5px'
          }}>
            📍 {data.identity.location} • 📧 {data.contacts.email} • 📱 {data.contacts.phone}
          </p>
        </div>
      </div>

      {/* Resume Notice */}
      <div style={{
        marginBottom: '25px',
        padding: '15px',
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '10px',
          margin: '0',
          color: '#374151',
          fontWeight: '400',
          lineHeight: '1.4'
        }}>
          Questo è un resume sintetico. Per informazioni dettagliate su esperienze e progetti visita: 
          <span style={{
            fontWeight: '600',
            color: '#1f2937'
          }}>
            pierpasqualealfinito.it
          </span>
        </p>
      </div>

      {/* Professional Summary */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: '600',
          margin: '0 0 15px 0',
          color: '#1f2937',
          borderBottom: '1px solid #d1d5db',
          paddingBottom: '8px'
        }}>
          Profilo Professionale
        </h2>
        <p style={{
          margin: '0',
          textAlign: 'justify',
          fontSize: '11px',
          fontWeight: '400',
          lineHeight: '1.6',
          color: '#374151'
        }}>
          Responsabile IT con esperienza in sviluppo full-stack e gestione sistemi digitali. 
          Specializzato in React, Node.js, automazioni e CRM personalizzati. 
          Background in Economia & Management con focus su digital transformation e ottimizzazione processi.
        </p>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '15px'
      }}>
        {/* Left Column */}
        <div style={{ flex: '2', paddingRight: '15px' }}>
          {/* Experience */}
          <div style={{ marginBottom: '18px', padding: '0' }}>
            <h2 style={{
               fontSize: '14px',
               fontWeight: '600',
               margin: '0 0 18px 0',
               color: '#1f2937',
               borderBottom: '1px solid #d1d5db',
               paddingBottom: '8px'
             }}>
               Esperienza Professionale
             </h2>
             {data.experience.slice(0, 4).map((exp: Experience, i: number) => (
               <div key={i} style={{ 
                 marginBottom: '20px',
                 paddingBottom: '15px',
                 borderBottom: i < 3 ? '1px solid #e5e7eb' : 'none'
               }}>
                <div style={{
                   display: 'flex',
                   justifyContent: 'space-between',
                   alignItems: 'flex-start',
                   marginBottom: '10px'
                 }}>
                   <div style={{ flex: 1 }}>
                     <h3 style={{
                       fontSize: '12px',
                       fontWeight: '600',
                       margin: '0 0 5px 0',
                       lineHeight: '1.3',
                       color: '#1f2937'
                     }}>
                       {exp.title}
                     </h3>
                     <p style={{
                       fontSize: '9px',
                       margin: '4px 0 6px 0',
                       color: '#6b7280',
                       fontWeight: '400',
                       lineHeight: '1.2'
                     }}>
                       {exp.company} • {exp.location}
                     </p>
                   </div>
                   <span style={{
                     fontSize: '9px',
                     color: '#6b7280',
                     fontWeight: '500',
                     whiteSpace: 'nowrap'
                   }}>
                     {exp.period}
                   </span>
                 </div>
                <ul style={{
                   margin: '0',
                   paddingLeft: '12px',
                   fontSize: '9px',
                   lineHeight: '1.3',
                   listStyle: 'disc'
                 }}>
                   {exp.bullets.slice(0, 3).map((bullet: string, j: number) => (
                     <li key={j} style={{
                       marginBottom: '3px',
                       color: '#4b5563'
                     }}>
                       {bullet}
                     </li>
                   ))}
                 </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: '18px', padding: '0' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 18px 0',
                color: '#1f2937',
                borderBottom: '1px solid #d1d5db',
                paddingBottom: '8px'
              }}>
                Progetti Principali
              </h2>
              {data.projects.slice(0, 2).map((proj: Project, i: number) => (
                 <div key={i} style={{ 
                   marginBottom: '20px',
                   paddingBottom: '15px',
                   borderBottom: i < 1 ? '1px solid #e5e7eb' : 'none'
                 }}>
                  <h3 style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    margin: '0 0 10px 0',
                    color: '#1f2937',
                    lineHeight: '1.3'
                  }}>
                    {proj.name}
                  </h3>
                  <p style={{
                    fontSize: '9px',
                    margin: '4px 0 6px 0',
                    color: '#6b7280',
                    fontWeight: '400',
                    lineHeight: '1.2'
                  }}>
                    {proj.description}
                  </p>
                  {proj.stack && (
                     <div style={{
                       display: 'flex',
                       flexWrap: 'wrap',
                       gap: '6px'
                     }}>
                       {proj.stack.slice(0, 4).map((tech: string, j: number) => (
                         <span key={j} style={{
                           fontSize: '8px',
                           padding: '3px 8px',
                           backgroundColor: '#f9fafb',
                     color: '#374151',
                     borderRadius: '4px',
                     fontWeight: '500',
                     border: '1px solid #d1d5db'
                         }}>
                           {tech}
                         </span>
                       ))}
                     </div>
                   )}
                 </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: '1', paddingLeft: '10px' }}>
          {/* Skills */}
          <div style={{ marginBottom: '18px', padding: '0' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '400',
              margin: '0 0 12px 0',
              color: '#2d3748',
              borderBottom: '2px solid #8b5cf6',
              paddingBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              💻 Competenze
            </h2>
            <div style={{ fontSize: '9px' }}>
              {Object.entries(data.skills.groups).map(([category, skills]) => {
                const categoryColors = {
                  frontend: { bg: '#faf5ff', border: '#e9d5ff', text: '#7c3aed', icon: '🎨' },
                  backend: { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a', icon: '⚙️' },
                  database: { bg: '#fef3c7', border: '#fde68a', text: '#d97706', icon: '🗄️' },
                  devops: { bg: '#dbeafe', border: '#93c5fd', text: '#2563eb', icon: '🚀' },
                  business: { bg: '#fce7f3', border: '#f9a8d4', text: '#db2777', icon: '📊' }
                };
                const colors = categoryColors[category as keyof typeof categoryColors] || 
                              { bg: '#f8fafc', border: '#e2e8f0', text: '#4a5568', icon: '💼' };
                
                return (
                  <div key={category} style={{ 
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: colors.bg,
                    borderRadius: '6px',
                    border: `1px solid ${colors.border}`,
                    borderLeft: `4px solid ${colors.text}`
                  }}>
                    <h4 style={{
                      fontSize: '9px',
                      fontWeight: '600',
                      margin: '0 0 6px 0',
                      color: colors.text,
                      textTransform: 'capitalize',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {colors.icon} {category}
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px'
                    }}>
                      {(skills as string[]).slice(0, 4).map((skill, idx) => (
                        <span key={idx} style={{
                          padding: '4px 8px',
                          backgroundColor: '#ffffff',
                          border: `1px solid ${colors.border}`,
                          borderRadius: '4px',
                          fontSize: '8px',
                          color: colors.text,
                          fontWeight: '400',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          textAlign: 'center',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '18px', padding: '0' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '400',
              margin: '0 0 12px 0',
              color: '#2d3748',
              borderBottom: '2px solid #ef4444',
              paddingBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🎓 Formazione
            </h2>
            {data.education.slice(0, 2).map((edu: { title: string; place: string; period: string }, i: number) => (
              <div key={i} style={{ 
                marginBottom: '12px',
                padding: '10px',
                backgroundColor: '#fef2f2',
                borderRadius: '6px',
                border: '1px solid #fecaca',
                borderLeft: '4px solid #ef4444'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '4px'
                }}>
                  <h3 style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    margin: '0',
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    📚 {edu.title.split('—')[0].trim()}
                  </h3>
                  <span style={{
                    fontSize: '8px',
                    color: '#991b1b',
                    fontWeight: '500',
                    backgroundColor: '#fee2e2',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    📅 {edu.period}
                  </span>
                </div>
                <p style={{
                  fontSize: '9px',
                  margin: '0',
                  color: '#b91c1c',
                  fontWeight: '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  🏛️ {edu.place}
                </p>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div style={{ marginBottom: '20px', padding: '0' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '400',
              margin: '0 0 12px 0',
              color: '#2d3748',
              borderBottom: '2px solid #059669',
              paddingBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🌍 Lingue
            </h2>
            {data.languages.map((lang: { name: string; level: string }, i: number) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '9px',
                marginBottom: '8px',
                padding: '8px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '6px',
                borderLeft: '4px solid #059669'
              }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#047857',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  🗣️ {lang.name}
                </span>
                <span style={{ 
                  color: '#065f46', 
                  fontWeight: '500', 
                  fontSize: '8px',
                  backgroundColor: '#d1fae5',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div style={{
        marginTop: '25px',
        padding: '12px 0',
        backgroundColor: '#ffffff',
         borderTop: '1px solid #d1d5db',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <span style={{
            fontSize: '9px',
            color: '#1e40af',
            fontWeight: '500'
          }}>
            🌐 Per informazioni complete e dettagliate:
          </span>
          <span style={{
            fontSize: '9px',
            color: '#1d4ed8',
            fontWeight: '600',
            backgroundColor: '#dbeafe',
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            pierpasqualealfinito.it
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            fontSize: '8px',
            color: '#64748b',
            fontWeight: '400'
          }}>
            📄 Resume Professionale
          </span>
          <span style={{ color: '#94a3b8' }}>•</span>
          <span style={{
            fontSize: '8px',
            color: '#64748b',
            fontWeight: '400'
          }}>
            {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* PDF Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        .pdf-template {
          font-family: 'Roboto', sans-serif !important;
        }
        
        @media print {
          .pdf-template {
            margin: 0 !important;
            padding: 10mm !important;
            font-size: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}