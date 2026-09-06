import { useEffect, useRef, useState } from "react";
import "./App.css";

import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaExternalLinkAlt,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaPhoneAlt,
  FaGraduationCap,
  FaSchool,
  FaCode,
  FaCertificate,
  FaAward,
  FaClock,
  FaCalendarAlt,
  FaArrowDown,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  SiExpress,
  SiMongodb,
  SiVite,
  SiPostman,
  SiJest,
  SiMysql,
  SiCplusplus,
  SiUdemy,
  SiLeetcode,
} from "react-icons/si";

import recoverAIImage from "./assets/recoverai.png";
import manoraImage from "./assets/manora.png";
import pagePulseImage from "./assets/pagepulse.png";
import profileImage from "./assets/pic1.jpg";
import profileImage1 from "./assets/profile.png";


function App() {
  const projectsRef = useRef(null);
  const cursorGlowRef = useRef(null);

  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);

  const [projectProgress, setProjectProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  /* =========================================
     PROJECT WHEEL + NAVBAR
  ========================================= */

  useEffect(() => {
    let animationFrame;

    const smoothStep = (value) => {
      return value * value * (3 - 2 * value);
    };

    const mapScrollToWheel = (normalized) => {
      if (normalized <= 0.2) {
        return 0;
      }

      if (normalized < 0.4) {
        const local =
          (normalized - 0.2) / 0.2;

        return smoothStep(local);
      }

      if (normalized <= 0.6) {
        return 1;
      }

      if (normalized < 0.8) {
        const local =
          (normalized - 0.6) / 0.2;

        return 1 + smoothStep(local);
      }

      return 2;
    };

    const handleScroll = () => {
      setNavbarScrolled(
        window.scrollY > 40
      );

      if (!projectsRef.current) {
        return;
      }

      const section =
        projectsRef.current;

      const rect =
        section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight;

      if (scrollDistance <= 0) {
        return;
      }

      const travelled =
        -rect.top;

      const normalized =
        Math.max(
          0,
          Math.min(
            1,
            travelled /
              scrollDistance
          )
        );

      targetProgress.current =
        mapScrollToWheel(
          normalized
        );
    };

    const animate = () => {
      const difference =
        targetProgress.current -
        smoothProgress.current;

      smoothProgress.current +=
        difference * 0.18;

      if (
        Math.abs(difference) <
        0.002
      ) {
        smoothProgress.current =
          targetProgress.current;
      }

      setProjectProgress(
        smoothProgress.current
      );

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    handleScroll();
    animate();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );

      cancelAnimationFrame(
        animationFrame
      );
    };
  }, []);

  /* =========================================
     ACTIVE NAVBAR
  ========================================= */

  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "skills",
      "certifications",
      "contact",
    ];

    const sections =
      sectionIds
        .map((id) =>
          document.getElementById(
            id
          )
        )
        .filter(Boolean);

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );

          if (
            visibleEntries.length >
            0
          ) {
            setActiveSection(
              visibleEntries[0]
                .target.id
            );
          }
        },
        {
          threshold: [
            0.15,
            0.3,
            0.45,
            0.6,
          ],

          rootMargin:
            "-15% 0px -40% 0px",
        }
      );

    sections.forEach(
      (section) =>
        observer.observe(section)
    );

    return () => {
      sections.forEach(
        (section) =>
          observer.unobserve(
            section
          )
      );

      observer.disconnect();
    };
  }, []);

  /* =========================================
     REVEAL
  ========================================= */

  useEffect(() => {
    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "is-visible"
                );

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -70px 0px",
        }
      );

    revealElements.forEach(
      (element) =>
        observer.observe(element)
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =========================================
     CURSOR GLOW
  ========================================= */

  useEffect(() => {
    const handleMouseMove = (
      event
    ) => {
      if (
        !cursorGlowRef.current
      ) {
        return;
      }

      cursorGlowRef.current.style.transform =
        `translate3d(
          ${event.clientX - 220}px,
          ${event.clientY - 220}px,
          0
        )`;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  const activeProject =
    Math.min(
      2,
      Math.max(
        0,
        Math.round(
          projectProgress
        )
      )
    );

  const getProjectStyle = (
    index
  ) => {
    const distance =
      index -
      projectProgress;

    const absoluteDistance =
      Math.abs(distance);

    const translateY =
      distance * 245;

    const translateZ =
      -absoluteDistance * 190;

    const scale =
      Math.max(
        0.79,
        1 -
          absoluteDistance *
            0.105
      );

    const opacity =
      Math.max(
        0,
        1 -
          absoluteDistance *
            0.74
      );

    const blur =
      Math.min(
        4.5,
        absoluteDistance * 3
      );

    const rotateX =
      distance * -6;

    const brightness =
      Math.max(
        0.4,
        1 -
          absoluteDistance *
            0.43
      );

    const zIndex =
      100 -
      Math.round(
        absoluteDistance * 20
      );

    return {
      transform: `
        translate(-50%, -50%)
        translateY(${translateY}px)
        translateZ(${translateZ}px)
        rotateX(${rotateX}deg)
        scale(${scale})
      `,

      opacity,

      filter: `
        blur(${blur}px)
        brightness(${brightness})
      `,

      zIndex,

      pointerEvents:
        activeProject === index
          ? "auto"
          : "none",
    };
  };

  const navClass = (
    section
  ) =>
    activeSection === section
      ? "nav-active"
      : "";

  return (
    <main className="portfolio">

      <div
        className="cursor-glow"
        ref={cursorGlowRef}
      />

      {/* =====================================
          NAVBAR
      ====================================== */}

      <nav
        className={
          navbarScrolled
            ? "navbar navbar-scrolled"
            : "navbar"
        }
      >
        <a
          href="#home"
          className="nav-logo"
        >
          SM.
        </a>

        <div className="nav-links">

          <a
            href="#home"
            className={navClass(
              "home"
            )}
          >
            Home
          </a>

          <a
            href="#about"
            className={navClass(
              "about"
            )}
          >
            About
          </a>

          <a
            href="#skills"
            className={navClass(
              "skills"
            )}
          >
            Skills
          </a>

          <a
            href="#certifications"
            className={navClass(
              "certifications"
            )}
          >
            Certifications
          </a>

          <a
            href="#contact"
            className={navClass(
              "contact"
            )}
          >
            Contact
          </a>

        </div>
      </nav>

      {/* =====================================
          HERO
      ====================================== */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="hero-layout">

          <div className="hero-content">

            <p className="hero-tag">
              Hello, I&apos;m
            </p>

            <h1>
              Shreyansh
              <br />
              Mohapatra
            </h1>

            <h2>
              Full-Stack Developer

              <span>
                {" "}•{" "}
              </span>

              C++ Programmer
            </h2>

            <p className="hero-description">
              Computer Science
              undergraduate building
              practical full-stack
              applications with React,
              Node.js, Express and
              MongoDB.
            </p>

            <div className="hero-buttons">

              <a
                href="#contact"
                className="primary-btn"
              >
                Get in Touch
              </a>

              <a
                href="#about"
                className="hero-text-link"
              >
                More about me

                <FaArrowDown />
              </a>

            </div>

            <div className="focus-strip">

              <span className="focus-status">

                <span className="focus-dot" />

                CURRENTLY FOCUSED ON
              </span>

              <div className="focus-items">

                <span>
                  Full-Stack Development
                </span>

                <span>
                  DSA
                </span>

                <span>
                  Backend Systems
                </span>

              </div>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-photo-glow" />

            <div className="hero-photo-card">

              <div className="hero-photo-top">

                <span>
                  PORTFOLIO / 2026
                </span>

                <span className="hero-online">

                  <span />

                  AVAILABLE
                </span>

              </div>

              <div className="hero-photo-frame">

                <img
                  src={profileImage}
                  alt="Shreyansh Mohapatra"
                />

              </div>

              <div className="hero-photo-footer">

                <div>

                  <span>
                    BASED IN
                  </span>

                  <strong>
                    Bhubaneswar, Odisha
                  </strong>

                </div>

                <FaMapMarkerAlt />

              </div>

            </div>

            <div className="floating-tech-card tech-card-react">
              <FaReact />
              React
            </div>

            <div className="floating-tech-card tech-card-node">
              <FaNodeJs />
              Node.js
            </div>

            <div className="floating-tech-card tech-card-cpp">
              <SiCplusplus />
              C++
            </div>

          </div>

        </div>

        <a
          href="#about"
          className="scroll-indicator"
          aria-label="Scroll to about section"
        >
          <span>
            Scroll
          </span>

          <div className="scroll-line" />
        </a>

      </section>

      {/* =====================================
          ABOUT
      ====================================== */}

      <section
        className="about-section"
        id="about"
      >
        <div className="section-container">

          <div className="reveal">

            <p className="section-label">
              ABOUT ME
            </p>

            <h2 className="section-title">
              A little more about who I am.
            </h2>

          </div>

          <div className="about-profile-grid reveal">

            <div className="profile-card">

              <div className="profile-image-shell">

                <div className="profile-image-glow" />

                <img
                  src={profileImage1}
                  alt="Shreyansh Mohapatra"
                  className="profile-image"
                />

              </div>

              <div className="profile-info">

                <p className="profile-small-label">
                  COMPUTER SCIENCE UNDERGRADUATE
                </p>

                <h3>
                  Shreyansh Mohapatra
                </h3>

                <p>
                  I’m a Computer Science
                  student at VIT Bhopal
                  University with an
                  interest in full-stack
                  web development,
                  software engineering
                  and problem solving.
                </p>

                <p>
                  I enjoy turning ideas
                  into practical
                  applications using
                  React, Node.js,
                  Express and MongoDB,
                  while regularly
                  strengthening my
                  fundamentals through
                  C++, DSA, OOP and DBMS.
                </p>

                <div className="profile-tags">

                  <span>
                    <FaCode />
                    Full Stack
                  </span>

                  <span>
                    <SiCplusplus />
                    C++
                  </span>

                  <span>
                    <FaDatabase />
                    Backend
                  </span>

                </div>

              </div>

            </div>

            <div className="about-stats">

              <div className="stat-card">

                <h3>
                  3
                </h3>

                <p>
                  Featured Projects
                </p>

              </div>

              <div className="stat-card">

                <h3>
                  2027
                </h3>

                <p>
                  Expected Graduation
                </p>

              </div>

              <div className="stat-card">

                <h3>
                  8.2
                </h3>

                <p>
                  Current CGPA
                </p>

              </div>

            </div>

          </div>

          <div className="education-block reveal">

            <div className="education-heading">

              <div className="education-heading-icon">
                <FaGraduationCap />
              </div>

              <div>

                <p className="education-label">
                  EDUCATION
                </p>

                <h3>
                  Academic Journey
                </h3>

              </div>

            </div>

            <div className="education-timeline">

              <div className="education-item">

                <div className="education-line-area">

                  <div className="education-dot" />

                  <div className="education-line" />

                </div>

                <div className="education-card">

                  <div className="education-icon">
                    <FaGraduationCap />
                  </div>

                  <div className="education-content">

                    <div className="education-top">

                      <div>

                        <h4>
                          Bachelor of Technology
                        </h4>

                        <p>
                          VIT Bhopal University
                        </p>

                      </div>

                      <span className="education-year">
                        Expected 2027
                      </span>

                    </div>

                    <p className="education-course">
                      Computer Science and Engineering
                    </p>

                    <div className="education-score">

                      CGPA

                      <strong>
                        8.2
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

              <div className="education-item">

                <div className="education-line-area">

                  <div className="education-dot" />

                  <div className="education-line" />

                </div>

                <div className="education-card">

                  <div className="education-icon">
                    <FaSchool />
                  </div>

                  <div className="education-content">

                    <div className="education-top">

                      <div>

                        <h4>
                          Class XII — CBSE
                        </h4>

                        <p>
                          Kendriya Vidyalaya Ballygunge
                        </p>

                      </div>

                      <span className="education-year">
                        2022 – 2023
                      </span>

                    </div>

                    <div className="education-score">

                      Percentage

                      <strong>
                        88.2%
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

              <div className="education-item">

                <div className="education-line-area">

                  <div className="education-dot" />

                </div>

                <div className="education-card">

                  <div className="education-icon">
                    <FaSchool />
                  </div>

                  <div className="education-content">

                    <div className="education-top">

                      <div>

                        <h4>
                          Class X — CBSE
                        </h4>

                        <p>
                          Kendriya Vidyalaya Ballygunge
                        </p>

                      </div>

                      <span className="education-year">
                        2020 – 2021
                      </span>

                    </div>

                    <div className="education-score">

                      Percentage

                      <strong>
                        97.2%
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================
          SKILLS
      ====================================== */}

      <section
        className="skills-section"
        id="skills"
      >

        <div className="section-container">

          <div className="reveal">

            <p className="section-label">
              SKILLS
            </p>

            <h2 className="section-title">
              Technologies I work with.
            </h2>

          </div>

          <div className="skills-grid">

            <div className="skill-card reveal">

              <div className="skill-card-shine" />

              <div className="skill-card-heading">

                <SiCplusplus
                  className="skill-main-icon"
                />

                <h3>
                  Programming
                </h3>

              </div>

              <div className="skill-tags">

                <span>
                  <SiCplusplus />
                  C++
                </span>

                <span>
                  <span className="text-icon">
                    C
                  </span>

                  C
                </span>

              </div>

            </div>

            <div className="skill-card reveal">

              <div className="skill-card-shine" />

              <div className="skill-card-heading">

                <FaReact
                  className="skill-main-icon"
                />

                <h3>
                  Frontend
                </h3>

              </div>

              <div className="skill-tags">

                <span>
                  <FaHtml5 />
                  HTML
                </span>

                <span>
                  <FaCss3Alt />
                  CSS
                </span>

                <span>
                  <FaJsSquare />
                  JavaScript
                </span>

                <span>
                  <FaReact />
                  React.js
                </span>

                <span>
                  <SiVite />
                  Vite
                </span>

              </div>

            </div>

            <div className="skill-card reveal">

              <div className="skill-card-shine" />

              <div className="skill-card-heading">

                <FaNodeJs
                  className="skill-main-icon"
                />

                <h3>
                  Backend
                </h3>

              </div>

              <div className="skill-tags">

                <span>
                  <FaNodeJs />
                  Node.js
                </span>

                <span>
                  <SiExpress />
                  Express.js
                </span>

                <span>
                  <FaDatabase />
                  REST APIs
                </span>

              </div>

            </div>

            <div className="skill-card reveal">

              <div className="skill-card-shine" />

              <div className="skill-card-heading">

                <SiMongodb
                  className="skill-main-icon"
                />

                <h3>
                  Databases
                </h3>

              </div>

              <div className="skill-tags">

                <span>
                  <SiMongodb />
                  MongoDB
                </span>

                <span>
                  <SiMongodb />
                  MongoDB Atlas
                </span>

                <span>
                  <SiMysql />
                  MySQL
                </span>

              </div>

            </div>

            <div className="skill-card reveal">

              <div className="skill-card-shine" />

              <div className="skill-card-heading">

                <FaGitAlt
                  className="skill-main-icon"
                />

                <h3>
                  Tools
                </h3>

              </div>

              <div className="skill-tags">

                <span>
                  <FaGitAlt />
                  Git
                </span>

                <span>
                  <FaGithub />
                  GitHub
                </span>

                <span>
                  <SiPostman />
                  Postman
                </span>

                <span>
                  <SiJest />
                  Jest
                </span>

                <span>
                  VS Code
                </span>

              </div>

            </div>

            <div className="skill-card reveal">

              <div className="skill-card-shine" />

              <div className="skill-card-heading">

                <FaDatabase
                  className="skill-main-icon"
                />

                <h3>
                  Core Concepts
                </h3>

              </div>

              <div className="skill-tags">

                <span>
                  DSA
                </span>

                <span>
                  OOP
                </span>

                <span>
                  DBMS
                </span>

                <span>
                  JWT
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          CODING PROFILES
      ====================================== */}

      <section className="coding-section">

        <div className="section-container">

          <div className="coding-heading reveal">

            <p className="section-label">
              CODING PROFILES
            </p>

            <h2 className="section-title">
              Where I practice and build.
            </h2>

            <p className="coding-intro">
              A look at my problem-solving
              practice and the repositories
              behind my projects.
            </p>

          </div>

          <div className="coding-grid">

            <a
              href="https://leetcode.com/u/ElJASzCWVb/"
              target="_blank"
              rel="noopener noreferrer"
              className="coding-card leetcode-card reveal"
            >

              <div className="coding-card-grid" />

              <div className="coding-card-glow leetcode-glow" />

              <div className="coding-profile-top">

                <div className="coding-logo leetcode-logo">
                  <SiLeetcode />
                </div>

                <span className="coding-platform">
                  LEETCODE
                </span>

              </div>

              <div className="coding-content">

                <p className="coding-kicker">
                  PROBLEM SOLVING
                </p>

                <h3>
                  DSA Practice
                  <br />
                  in C++
                </h3>

                <p>
                  Regular problem solving
                  focused on data structures,
                  algorithms and improving
                  coding interview fundamentals.
                </p>

              </div>

              <div className="coding-bottom">

                <div className="coding-tags">

                  <span>
                    C++
                  </span>

                  <span>
                    DSA
                  </span>

                  <span>
                    Algorithms
                  </span>

                </div>

                <span className="coding-open">
                  View Profile
                  <FaExternalLinkAlt />
                </span>

              </div>

            </a>

            <a
              href="https://github.com/Yash-tech25"
              target="_blank"
              rel="noopener noreferrer"
              className="coding-card github-card reveal"
            >

              <div className="coding-card-grid" />

              <div className="coding-card-glow github-glow" />

              <div className="coding-profile-top">

                <div className="coding-logo github-logo">
                  <FaGithub />
                </div>

                <span className="coding-platform">
                  GITHUB
                </span>

              </div>

              <div className="coding-content">

                <p className="coding-kicker">
                  DEVELOPMENT
                </p>

                <h3>
                  Projects,
                  <br />
                  code & experiments.
                </h3>

                <p>
                  Repositories containing my
                  full-stack applications,
                  development work, experiments
                  and project implementations.
                </p>

              </div>

              <div className="coding-bottom">

                <div className="coding-tags">

                  <span>
                    React
                  </span>

                  <span>
                    Node.js
                  </span>

                  <span>
                    Full Stack
                  </span>

                </div>

                <span className="coding-open">
                  View GitHub
                  <FaExternalLinkAlt />
                </span>

              </div>

            </a>

          </div>

        </div>

      </section>

      {/* =====================================
          CERTIFICATIONS
      ====================================== */}

      <section
        className="certifications-section"
        id="certifications"
      >

        <div className="section-container">

          <div className="reveal">

            <p className="section-label">
              CERTIFICATIONS & TRAINING
            </p>

            <h2 className="section-title">
              Learning beyond the classroom.
            </h2>

            <p className="certifications-intro">
              Courses and professional
              training that helped me
              strengthen my development
              fundamentals and gain
              practical exposure.
            </p>

          </div>

          <div className="certifications-grid">

            <article className="certificate-card reveal">

              <div className="certificate-glow" />

              <div className="certificate-preview">

                <iframe
                  src="/web-development-certificate.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  title="Web Development Certificate Preview"
                />

                <div className="certificate-preview-overlay" />

              </div>

              <div className="certificate-top">

                <div className="certificate-logo certificate-udemy">
                  <SiUdemy />
                </div>

                <span className="certificate-type">
                  CERTIFICATE OF COMPLETION
                </span>

              </div>

              <div className="certificate-content">

                <p className="certificate-provider">
                  Udemy
                </p>

                <h3>
                  The Web Developer Bootcamp 2025
                </h3>

                <p className="certificate-description">
                  Comprehensive web
                  development training
                  covering modern foundations
                  and practical application
                  development.
                </p>

                <div className="certificate-meta">

                  <span>
                    <FaAward />
                    Colt Steele
                  </span>

                  <span>
                    <FaClock />
                    74 Hours
                  </span>

                  <span>
                    <FaCalendarAlt />
                    Sept. 2025
                  </span>

                </div>

                <a
                  href="/web-development-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-link"
                >
                  View Certificate

                  <FaExternalLinkAlt />
                </a>

              </div>

              <div className="certificate-number">
                01
              </div>

            </article>

            <article className="certificate-card reveal">

              <div className="certificate-glow certificate-glow-blue" />

              <div className="certificate-preview">

                <iframe
                  src="/ai-ml-certificate.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  title="AI ML Certificate Preview"
                />

                <div className="certificate-preview-overlay" />

              </div>

              <div className="certificate-top">

                <div className="certificate-logo">
                  <FaCertificate />
                </div>

                <span className="certificate-type">
                  INTERNSHIP CERTIFICATE
                </span>

              </div>

              <div className="certificate-content">

                <p className="certificate-provider">
                  MPOnline Limited
                </p>

                <h3>
                  AI / ML Internship
                </h3>

                <p className="certificate-description">
                  Internship training
                  providing practical
                  exposure to Artificial
                  Intelligence and Machine
                  Learning concepts in a
                  professional environment.
                </p>

                <div className="certificate-meta">

                  <span>
                    <FaGraduationCap />
                    AI / ML
                  </span>

                  <span>
                    <FaCalendarAlt />
                    May – July 2026
                  </span>

                </div>

                <a
                  href="/ai-ml-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-link"
                >
                  View Certificate

                  <FaExternalLinkAlt />
                </a>

              </div>

              <div className="certificate-number">
                02
              </div>

            </article>

          </div>

        </div>

      </section>

      {/* =====================================
          PROJECTS
      ====================================== */}

      <section
        className="projects-wheel-section"
        id="projects"
        ref={projectsRef}
      >

        <div className="projects-stage">

          <div className="projects-heading">

            <p className="section-label">
              PROJECTS
            </p>

            <h2 className="section-title">
              Things I&apos;ve built.
            </h2>

            <div className="projects-heading-bottom">

              <p className="wheel-hint">
                Scroll to explore
              </p>

              <div className="project-counter">

                <strong>
                  0{activeProject + 1}
                </strong>

                <span>
                  /
                </span>

                <span>
                  03
                </span>

              </div>

            </div>

          </div>

          <div className="wheel-card-area">

            <article
              className={
                `project-card wheel-project ${
                  activeProject === 0
                    ? "active-project"
                    : ""
                }`
              }
              style={
                getProjectStyle(0)
              }
            >

              <div className="project-image-wrap">

                <img
                  src={recoverAIImage}
                  alt="RecoverAI dashboard"
                  className="project-image"
                />

                <div className="project-image-overlay" />

                <div className="project-image-label">
                  LIVE DASHBOARD
                </div>

              </div>

              <div className="project-content">

                <div className="project-top-row">

                  <span className="project-number">
                    01
                  </span>

                  <a
                    href="https://recover-ai-nu-pink.vercel.app/#/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-live-link"
                  >
                    Live

                    <FaExternalLinkAlt />
                  </a>

                </div>

                <h3>
                  RecoverAI
                </h3>

                <p className="project-subtitle">
                  AI-Assisted Revenue Recovery
                </p>

                <p className="project-description">
                  Revenue recovery platform
                  combining deterministic
                  rules with Gemini-assisted
                  reasoning for failed and
                  abandoned payments.
                </p>

                <p className="project-description">
                  Supports multilingual
                  recovery, Promise-to-Pay,
                  Razorpay webhooks,
                  guardrails and recovery
                  analytics.
                </p>

                <div className="project-highlights">

                  <span>
                    Conversational Recovery
                  </span>

                  <span>
                    Hindi / English / Hinglish
                  </span>

                  <span>
                    Promise-to-Pay
                  </span>

                  <span>
                    Razorpay
                  </span>

                </div>

                <div className="project-tech">

                  <span>
                    React
                  </span>

                  <span>
                    Node.js
                  </span>

                  <span>
                    MongoDB
                  </span>

                  <span>
                    Gemini API
                  </span>

                  <span>
                    Razorpay
                  </span>

                </div>

              </div>

            </article>

            <article
              className={
                `project-card wheel-project ${
                  activeProject === 1
                    ? "active-project"
                    : ""
                }`
              }
              style={
                getProjectStyle(1)
              }
            >

              <div className="project-image-wrap">

                <img
                  src={manoraImage}
                  alt="Manora mental wellness application"
                  className="project-image"
                />

                <div className="project-image-overlay" />

                <div className="project-image-label">
                  LIVE APPLICATION
                </div>

              </div>

              <div className="project-content">

                <div className="project-top-row">

                  <span className="project-number">
                    02
                  </span>

                  <a
                    href="https://mental-health-project-mu.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-live-link"
                  >
                    Live

                    <FaExternalLinkAlt />
                  </a>

                </div>

                <h3>
                  Manora
                </h3>

                <p className="project-subtitle">
                  Mental Wellness Platform
                </p>

                <p className="project-description">
                  Full-stack wellness
                  application with
                  authentication, mood
                  tracking, journaling and
                  daily wellness tracking.
                </p>

                <p className="project-description">
                  Includes meditation,
                  guided breathing,
                  ambient sounds, sleep
                  guidance and AI-assisted
                  journal analysis.
                </p>

                <div className="project-highlights">

                  <span>
                    Mood Tracking
                  </span>

                  <span>
                    Meditation
                  </span>

                  <span>
                    Ambient Sounds
                  </span>

                  <span>
                    AI Journal Analysis
                  </span>

                </div>

                <div className="project-tech">

                  <span>
                    React
                  </span>

                  <span>
                    Node.js
                  </span>

                  <span>
                    MongoDB
                  </span>

                  <span>
                    JWT
                  </span>

                  <span>
                    Gemini API
                  </span>

                </div>

              </div>

            </article>

            <article
              className={
                `project-card wheel-project ${
                  activeProject === 2
                    ? "active-project"
                    : ""
                }`
              }
              style={
                getProjectStyle(2)
              }
            >

              <div className="project-image-wrap">

                <img
                  src={pagePulseImage}
                  alt="PagePulse website audit application"
                  className="project-image"
                />

                <div className="project-image-overlay" />

                <div className="project-image-label">
                  LIVE TOOL
                </div>

              </div>

              <div className="project-content">

                <div className="project-top-row">

                  <span className="project-number">
                    03
                  </span>

                  <a
                    href="https://page-pulse-lac.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-live-link"
                  >
                    Live

                    <FaExternalLinkAlt />
                  </a>

                </div>

                <h3>
                  PagePulse
                </h3>

                <p className="project-subtitle">
                  SEO & Performance Audit Tool
                </p>

                <p className="project-description">
                  Web auditing application
                  that fetches websites
                  through an Express backend
                  and analyzes their HTML
                  using Cheerio.
                </p>

                <p className="project-description">
                  Provides SEO checks,
                  performance metrics,
                  error handling and
                  Jest-tested parsing logic.
                </p>

                <div className="project-highlights">

                  <span>
                    SEO Analysis
                  </span>

                  <span>
                    HTML Parsing
                  </span>

                  <span>
                    Performance
                  </span>

                  <span>
                    Jest Tests
                  </span>

                </div>

                <div className="project-tech">

                  <span>
                    React
                  </span>

                  <span>
                    Express
                  </span>

                  <span>
                    Axios
                  </span>

                  <span>
                    Cheerio
                  </span>

                  <span>
                    Jest
                  </span>

                </div>

              </div>

            </article>

          </div>

          <div className="wheel-progress">

            <span
              className={
                activeProject === 0
                  ? "active"
                  : ""
              }
            />

            <span
              className={
                activeProject === 1
                  ? "active"
                  : ""
              }
            />

            <span
              className={
                activeProject === 2
                  ? "active"
                  : ""
              }
            />

          </div>

        </div>

      </section>

      {/* =====================================
          CONTACT
      ====================================== */}

      <section
        className="contact-section"
        id="contact"
      >

        <div className="contact-container">

          <div className="contact-heading reveal">

            <p className="section-label">
              CONTACT
            </p>

            <h2>
              Let&apos;s build something interesting.
            </h2>

            <p>
              I&apos;m open to internships,
              collaborations, projects and
              opportunities where I can build,
              learn and contribute.
            </p>

          </div>

          <div className="contact-grid contact-grid-three">

            <a
              href="mailto:mohapatrashreyansh@gmail.com"
              className="contact-card reveal"
            >

              <div className="contact-card-glow" />

              <div className="contact-icon">
                <FaEnvelope />
              </div>

              <div className="contact-info">

                <span>
                  Email
                </span>

                <h3>
                  mohapatrashreyansh@gmail.com
                </h3>

                <p>
                  Send me a message
                </p>

              </div>

              <FaExternalLinkAlt
                className="contact-arrow"
              />

            </a>

            <a
              href="tel:+919827984651"
              className="contact-card reveal"
            >

              <div className="contact-card-glow" />

              <div className="contact-icon">
                <FaPhoneAlt />
              </div>

              <div className="contact-info">

                <span>
                  Phone
                </span>

                <h3>
                  +91 9827984651
                </h3>

                <p>
                  Call or connect directly
                </p>

              </div>

              <FaExternalLinkAlt
                className="contact-arrow"
              />

            </a>

            <a
              href="https://www.linkedin.com/in/smohapatra-25sm/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card reveal"
            >

              <div className="contact-card-glow" />

              <div className="contact-icon">
                <FaLinkedin />
              </div>

              <div className="contact-info">

                <span>
                  LinkedIn
                </span>

                <h3>
                  Shreyansh Mohapatra
                </h3>

                <p>
                  Connect professionally
                </p>

              </div>

              <FaExternalLinkAlt
                className="contact-arrow"
              />

            </a>

          </div>

          <div className="contact-cta reveal">

            <div>

              <span className="contact-cta-label">
                WANT THE COMPLETE PICTURE?
              </span>

              <h3>
                Take a look at my resume.
              </h3>

            </div>

            <a
              href="/Shreyansh_Mohapatra_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              <FaDownload />

              Resume
            </a>

          </div>

          {/* =================================
              REFINED FOOTER
          ================================== */}

          <footer className="footer">

            <div className="footer-left">

              <div className="footer-logo">
                SM.
              </div>

              <div className="footer-name">

                <strong>
                  Shreyansh Mohapatra
                </strong>

                <span>
                  Computer Science • VIT Bhopal
                </span>

              </div>

            </div>

            <div className="footer-center">

              <span className="footer-location">
                <FaMapMarkerAlt />
                Bhubaneswar, Odisha
              </span>

              <span className="footer-divider">
                •
              </span>

              <span>
                React + Vite
              </span>

            </div>

            <div className="footer-right">

              <span className="footer-year">
                © 2026
              </span>

              <a
                href="#home"
                className="back-top"
              >
                Back to top
                <span>
                  ↑
                </span>
              </a>

            </div>

          </footer>

        </div>

      </section>

    </main>
  );
}

export default App;